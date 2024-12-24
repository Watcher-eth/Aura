import { defineConfig } from "@wagmi/cli"
import { foundry, react } from "@wagmi/cli/plugins"
import fs from "fs"
import path from "path"
import { Address } from "viem"
import { BASE_SEPOLIA_CHAIN_ID, BASE_CHAIN_ID } from "./consts"

interface Deployments {
    ReviewRegistry?: Address | Record<number, Address>
    BountyManager?: Address | Record<number, Address>
}

function getFoundryDeployments(): Deployments {
    const broadcastPath = path.join(__dirname, "broadcast")
    const deploymentFiles = fs.readdirSync(broadcastPath)

    const deployments: Deployments = {}

    const chainIds = [BASE_SEPOLIA_CHAIN_ID, BASE_CHAIN_ID] // Handle both chain IDs

    deploymentFiles.forEach((file) => {
        chainIds.forEach((chainId) => {
            const filePath = path.join(broadcastPath, file, chainId)

            if (fs.existsSync(filePath)) {
                const filesInPath = fs.readdirSync(filePath)

                const deploymentFile = filesInPath.find(
                    (f) =>
                        f.includes("run-latest.json") ||
                        f.includes("deployment.json")
                )

                if (deploymentFile) {
                    const rawData = fs.readFileSync(
                        path.join(filePath, deploymentFile)
                    )
                    const jsonData = JSON.parse(rawData.toString())

                    // Adding unique file identifier to avoid duplicate contract names
                    const uniquePart = file.replace(/[^a-zA-Z0-9]/g, "")

                    jsonData.transactions.forEach((tx: any) => {
                        console.log(
                            "tx",
                            tx.transactionType,
                            tx.contractAddress
                        )

                        if (tx.transactionType === "CREATE") {
                            // If contractName is undefined or empty, set it to 'EightBallAddress'
                            let contractName = tx.contractName
                            if (!contractName) {
                                contractName = "EightBall"
                                console.warn(
                                    `Contract name missing for tx with address ${tx.contractAddress}, setting to "EightBall"`
                                )
                            }

                            const contractAddressKey = `${contractName}`

                            if (!deployments[contractAddressKey]) {
                                deployments[
                                    contractAddressKey as keyof Deployments
                                ] = {}
                            }

                            // Store address under the current chain ID
                            deployments[
                                contractAddressKey as keyof Deployments
                            ][chainId] = tx.contractAddress
                        } else {
                            console.warn(
                                `Missing contractName or contractAddress in ${file}`
                            )
                            console.log(`Transaction data:`, tx.contractAddress)
                        }
                    })
                }
            } else {
                console.warn(
                    `Warning: File path does not exist for ${filePath}`
                )
            }
        })
    })

    console.log("Final deployments:", deployments)

    return deployments
}

const foundryDeployments: Deployments = getFoundryDeployments()


/** @type {import('@wagmi/cli').Config} */
export default defineConfig({
    out: "generated.ts",
    plugins: [
        react(),
        foundry({
            project: "./",
            artifacts: "out",
            deployments: {
                ReviewRegistry: foundryDeployments.ReviewRegistry,
                BountyManager: foundryDeployments.BountyManager,
            },
            exclude: [
                "Scripts.sol/**",
                "DevOpsTools.sol/**",
                "ERC20.sol/**",
                "ERC20/**",
                "IERC20.sol/**",
                "IERC165.sol/**",
                "Mock*.sol/**",
                "Test.sol/**",
                "Common.sol/**",
                "Mock.sol/**",
                "StdAssertions.sol/**",
                "StdInvariant.sol/**",
                "StdError.sol/**",
                "StdCheats.sol/**",
                "StdMath.sol/**",
                "StdJson.sol/**",
                "StdStorage.sol/**",
                "StdUtils.sol/**",
                "Vm.sol/**",
                "console.sol/**",
                "console2.sol/**",
                "test.sol/**",
                "**.s.sol/*.json",
                "**.t.sol/*.json",
                "**.t.sol/*.json",
            ],
            include: ["*.json"],
            forge: {
                clean: true,
                build: true,
                rebuild: true,
                path: "forge",
            },
        }),
    ],
})