# SoraPlex

**SoraPlex** is a lightweight Plex integration module designed for use with [Sora]([https://sora.sh](https://sora.jm26.net/)).  
It allows Sora to interface with your personal Plex server.

---

## 🔧 [Recommended] Setup Instructions

1. **Install Luna Media App on iOS**
- Link to be updated here

2: **Add the JSON file linked in this repo in the app**

3: **Modify the service settings**
   Open the services menu and click on the pencil next to the Plex logo.
   - Input your Plex token and BaseURL, these will remain completely offline, so this is the safest method!

4: **Activate the service and enjoy!**

**Note:** Currently it is only possible to use this in Luna, but the settings options will be added to Sora before updates get dropped in favor of Luna.

---

## 🔧 [Manual] Setup Instructions

1. **Configure Your Server Info**  
   Open the JS file and replace the placeholders with:
   - Your Plex server's base URL (e.g., `https://192.168.0.1:32400`)
   - Your Plex auth token (e.g., `d5Gv0NqZa1Xr7KyUbTc9`, not a real token of course lol)  
     [How to find your Plex token →](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/)

2. **Host the Files Privately**  
   Upload both the `.js` and `.json` files to a **private** server.  
   ⚠️ Do **not** host these files publicly — exposing your Plex token can compromise your server.

3. **Update the JSON File**  
   In the JSON file, set the `scriptUrl` key to the **raw URL** of your hosted JS file.

4. **Import to Sora**  
   Copy the **raw URL** of your JSON file and import it into Sora.

---

## 💡 Notes

- Tested with one Plex server; should theoretically work with any.
- Keep your server and token secure — use HTTPS and avoid exposing the files.

