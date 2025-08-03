//
// Sora Plex Module
// 50/50 <3
//
// This module allows you to search for media on your Plex server, extract details about it,
// and retrieve stream URLs for playback. It supports searching for movies, TV shows, and episodes
// and can handle both single episodes and entire seasons.
//
// Provide the IP and port of your Plex server in the baseUrl variable.
// Provide your Plex token in the plexToken variable. To grab your plex token, 
// please viist https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/
//
// Make sure to host this file on a private webserver or a private GitHub repository!
//


const baseUrl = "PUT BASE URL HERE"; // e.g., "http://192.168.0.1:32400";
const plexToken = "PUT PLEX TOKEN HERE"; // usually a 20 character string, made up of letters and numbers

//
// Do not edit below this line unless you know what you're doing.
//

async function searchResults(keyword) {
    try {
        const headers = {
            "accept": "application/json",
            "X-Plex-token": plexToken,
        };
        const response = await fetchv2(baseUrl + "/search?query=" + encodeURIComponent(keyword), headers);
        const json = await response.json();
        const results = [];

        const metadataList = json?.MediaContainer?.Metadata || [];

        for (const item of metadataList) {
            results.push({
                title: item.title?.trim() || "Unknown",
                image: baseUrl + item.thumb?.trim() + "?X-Plex-Token=" + plexToken || "",
                href: item.key?.trim() || ""
            });
        }

        return JSON.stringify(results);
    } catch (err) {
        return JSON.stringify([{
            title: "Error",
            image: "Error",
            href: "Error"
        }]);
    }
}

async function extractDetails(key) {
    try {
        const headers = {
            "accept": "application/json",
            "X-Plex-token": plexToken,
        };

        let metadata;

        if (key.endsWith("/children")) {
            const response = await fetchv2(baseUrl + key, headers);
            const json = await response.json();
            const seasons = json?.MediaContainer?.Metadata;
            if (!seasons?.length) throw new Error("No seasons found");

            const seasonKey = seasons[0]?.key;
            if (!seasonKey) throw new Error("No season key found");

            const seasonRes = await fetchv2(baseUrl + seasonKey, headers);
            const seasonJson = await seasonRes.json();
            metadata = seasonJson?.MediaContainer?.Metadata?.[0];
        } else {
            const response = await fetchv2(baseUrl + key, headers);
            const json = await response.json();
            metadata = json?.MediaContainer?.Metadata?.[0];
        }

        const description = metadata?.summary?.trim() || "N/A";
        const airdate = metadata?.originallyAvailableAt || "N/A";

        return JSON.stringify([{
            description,
            aliases: "N/A",
            airdate
        }]);
    } catch (err) {
        return JSON.stringify([{
            description: "Error",
            aliases: "Error",
            airdate: "Error"
        }]);
    }
}

async function extractEpisodes(key) {
    const results = [];
    try {
        const headers = {
            "accept": "application/json",
            "X-Plex-token": plexToken,
        };

        if (key.endsWith("/children")) {
            const res = await fetchv2(baseUrl + key, headers);
            const json = await res.json();
            const seasons = json?.MediaContainer?.Metadata || [];

            for (const season of seasons) {
                if (season.key?.endsWith("/children")) {
                    const seasonRes = await fetchv2(baseUrl + season.key, headers);
                    const seasonJson = await seasonRes.json();
                    const episodes = seasonJson?.MediaContainer?.Metadata || [];

                    let epNumber = 1;
                    for (const ep of episodes) {
                        results.push({
                            href: ep.key,
                            number: epNumber++
                        });
                    }
                }
            }
        } else {
            results.push({
                href: key,
                number: 1
            });
        }

        return JSON.stringify(results);
    } catch (err) {
        return JSON.stringify([{
            href: "Error",
            number: "Error"
        }]);
    }
}

async function extractStreamUrl(key) {
    try {
        const headers = {
            "accept": "application/json",
            "X-Plex-token": plexToken,
        };

        const res = await fetchv2(baseUrl + key, headers);
        const json = await res.json();

        const partKey = json?.MediaContainer?.Metadata?.[0]?.Media?.[0]?.Part?.[0]?.key;
        console.log(baseUrl + partKey + "?X-Plex-Token=" + plexToken);

        return baseUrl + partKey + "?X-Plex-Token=" + plexToken;
    } catch (err) {
        return "https://files.catbox.moe/avolvc.mp4";
    }
}

