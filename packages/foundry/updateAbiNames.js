import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, "generated.ts");

try {
    const data = await readFile(filePath, "utf8");

    // Regular expression to match ABI constants (ending with "Abi")
    const abiRegex = /export const (\w+Abi)\s*=/g;

    // Regular expression to match Config constants (ending with "Config")
    const configRegex = /export const (\w+Config)\s*=/g;

    // Object to store mapping of old names to new PascalCase names
    const replacements = {};

    // First step: Replace the Abi constant names and store replacements
    let updatedData = data.replace(abiRegex, (match, constName) => {
        const updatedName =
            constName.charAt(0).toUpperCase() + constName.slice(1);
        replacements[constName] = updatedName;
        return match.replace(constName, updatedName);
    });

    // Second step: Replace the Config constant names and store replacements
    updatedData = updatedData.replace(configRegex, (match, constName) => {
        const updatedName =
            constName.charAt(0).toUpperCase() + constName.slice(1);
        replacements[constName] = updatedName;
        return match.replace(constName, updatedName);
    });

    // Third step: Replace references to the updated Abi, Address, and Config constants in the file
    let finalData = updatedData;

    Object.keys(replacements).forEach((oldName) => {
        const newName = replacements[oldName];

        // Create a regex to find and replace all references of the old constant names
        const referenceRegex = new RegExp(`\\b${oldName}\\b`, "g");
        finalData = finalData.replace(referenceRegex, newName);

        // Also check if there is a corresponding "Address" constant and update it too
        if (oldName.endsWith("Abi")) {
            const oldAddress = oldName.replace("Abi", "Address");
            const newAddress = newName.replace("Abi", "Address");
            const addressRegex = new RegExp(`\\b${oldAddress}\\b`, "g");
            finalData = finalData.replace(addressRegex, newAddress);
        }
    });

    // Write the final result back to the file
    await writeFile(filePath, finalData, "utf8");
    console.log("Successfully updated all Abi, Address, and Config constant names to PascalCase.");
} catch (err) {
    console.error("Error:", err);
}