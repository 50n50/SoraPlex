# SoraPlex

**SoraPlex** is a lightweight Plex integration module designed for use with [Sora]([https://sora.sh](https://sora.jm26.net/)).  
It allows Sora to interface with your personal Plex server.

---

## 🔧 Setup Instructions

1. **Configure Your Server Info**  
   Open the JS file and replace the placeholders with:
   - Your Plex server's base URL (e.g., `https://192.168.0.1:32400`)
   - Your Plex auth token  
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

