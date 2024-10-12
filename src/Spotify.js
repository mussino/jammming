let accessToken;
const clientId = '26991df930c04fe0adbddc5e41bbc8ca';  // Replace with your client ID
const redirectUri = 'http://localhost:3000/';  // Replace with your redirect URI

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // Check if access token is in the URL
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenMatch && expiresInMatch) {
            accessToken = tokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // Clear the access token after it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            
            return accessToken;
        } else {
            // Redirect user to Spotify authorization
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    // Get the current user's Spotify ID
    getCurrentUserId() {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };

        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => jsonResponse.id);
    },

    // Create a new playlist
    createPlaylist(playlistName) {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        return this.getCurrentUserId().then(userId => {
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: playlistName,
                    description: 'New playlist from Jammming app',
                    public: false
                })
            })
            .then(response => response.json())
            .then(jsonResponse => jsonResponse.id);  // Return the new playlist ID
        });
    },

    // Add tracks to a playlist
    addTracksToPlaylist(playlistId, trackUris) {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                uris: trackUris
            })
        });
    },

    // Search for tracks using the Spotify API
    search(term) {
        const accessToken = this.getAccessToken();
        const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
  
        console.log("Search Term: ", term);
        console.log("Access Token: ", accessToken);
        console.log("Search URL: ", url);
  
        return fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log("Spotify Response: ", jsonResponse);  // Log the entire API response
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
        })
        .catch(error => console.error('Error fetching Spotify data:', error));
    },

    // Save the playlist to Spotify
    savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris.length) {
            return;
        }

        return this.createPlaylist(playlistName).then(playlistId => {
            return this.addTracksToPlaylist(playlistId, trackUris);
        });
    }
};

export default Spotify;