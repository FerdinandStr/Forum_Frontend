const presets = [["@babel/preset-react"]]
const plugins = [
    [
        "search-and-replace",
        {
            rules: [
                {
                    search: "http://localhost:3000",
                    // replace: "http://wwi20-11.projekt.dhbw-heidenheim.de:3000"
                    replace: "https://wwi20-11.projekt.dhbw-heidenheim.de/api"
                }
            ]
        }
    ]
]
module.exports = { presets, plugins }
