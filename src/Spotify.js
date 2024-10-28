const clientId = '26991df930c04fe0adbddc5e41bbc8ca';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            console.log("Access token already exists.");
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            console.log("New access token acquired:", accessToken);

            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            console.log("Missing playlist name or tracks.");
            return Promise.resolve();
        }

        console.log("Saving playlist:", name, trackUris);

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log("User ID response:", jsonResponse);
                if (!jsonResponse.id) throw new Error("Failed to retrieve user ID.");
                userId = jsonResponse.id;

                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: name })
                });
            })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log("Playlist creation response:", jsonResponse);
                if (!jsonResponse.id) throw new Error("Failed to create playlist.");
                const playlistId = jsonResponse.id;

                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                });
            })
            .then(response => response.json())
            .then(addTracksResponse => {
                console.log("Tracks added to playlist:", addTracksResponse);
            })
            .catch(error => {
                console.error("Error in savePlaylist:", error);
                return Promise.reject(error);
            });
    }
};

export default Spotify;