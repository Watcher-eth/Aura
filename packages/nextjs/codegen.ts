import { CodegenConfig } from "@graphql-codegen/cli"

const GRAPH_ENDPOINT_URL = "https://aura-production-c3e7.up.railway.app"

const config: CodegenConfig = {
  schema: GRAPH_ENDPOINT_URL,
  documents: ["./hooks/**/*.{ts,tsx}"],
  generates: {
    "./__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "tgql",
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
