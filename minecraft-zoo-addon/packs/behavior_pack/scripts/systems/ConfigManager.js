export class ConfigManager {
    constructor() {
        this.config = this.getDefaultConfig();
        this.loadConfig();
    }
    getDefaultConfig() {
        return {
            general: {
                zooName: "Amazing Zoo World",
                welcomeMessage: "Welcome to our amazing zoo! Enjoy your visit!",
                maxVisitors: 50,
                openingHours: {
                    start: 8, // 8 AM
                    end: 18 // 6 PM
                }
            },
            permissions: {
                defaultRole: 'visitor',
                allowSelfPromotion: false,
                builderCanPromoteVisitors: false
            },
            aiCaretakers: {
                enabled: true,
                cleaningInterval: 1200, // 60 seconds
                feedingInterval: 2400, // 120 seconds
                maxWorkDistance: 32,
                workSpeed: 1.0
            },
            exhibits: {
                "African Safari": {
                    animalTypes: ["minecraft:lion", "minecraft:elephant", "minecraft:giraffe"],
                    feedingSchedule: [9, 15], // 9 AM and 3 PM
                    cleaningInterval: 30, // 30 minutes
                    maxAnimals: 10
                },
                "Arctic Zone": {
                    animalTypes: ["minecraft:polar_bear", "minecraft:fox"],
                    feedingSchedule: [10, 16],
                    cleaningInterval: 45,
                    maxAnimals: 6
                },
                "Farm Animals": {
                    animalTypes: ["minecraft:cow", "minecraft:pig", "minecraft:sheep", "minecraft:chicken"],
                    feedingSchedule: [8, 12, 17],
                    cleaningInterval: 20,
                    maxAnimals: 20
                }
            },
            economy: {
                enabled: false,
                ticketPrice: 10,
                feedingCost: 5,
                currency: "Zoo Coins"
            }
        };
    }
    getConfig() {
        return JSON.parse(JSON.stringify(this.config)); // Deep copy
    }
    updateConfig(newConfig) {
        this.config = this.mergeDeep(this.config, newConfig);
        this.saveConfig();
    }
    // Specific getters for easy access
    getZooName() {
        return this.config.general.zooName;
    }
    getWelcomeMessage() {
        return this.config.general.welcomeMessage;
    }
    getDefaultRole() {
        return this.config.permissions.defaultRole;
    }
    getAICaretakerConfig() {
        return { ...this.config.aiCaretakers };
    }
    getExhibitConfig(exhibitName) {
        return this.config.exhibits[exhibitName];
    }
    getAllExhibits() {
        return Object.keys(this.config.exhibits);
    }
    isEconomyEnabled() {
        return this.config.economy.enabled;
    }
    // Configuration commands for admins
    setZooName(player, name) {
        this.config.general.zooName = name;
        this.saveConfig();
        player.sendMessage(`§aZoo name updated to: §b${name}`);
    }
    setWelcomeMessage(player, message) {
        this.config.general.welcomeMessage = message;
        this.saveConfig();
        player.sendMessage(`§aWelcome message updated!`);
    }
    addExhibit(player, name, animalTypes) {
        this.config.exhibits[name] = {
            animalTypes,
            feedingSchedule: [9, 15],
            cleaningInterval: 30,
            maxAnimals: 10
        };
        this.saveConfig();
        player.sendMessage(`§aExhibit "${name}" added with animals: ${animalTypes.join(', ')}`);
    }
    removeExhibit(player, name) {
        if (this.config.exhibits[name]) {
            delete this.config.exhibits[name];
            this.saveConfig();
            player.sendMessage(`§aExhibit "${name}" removed`);
        }
        else {
            player.sendMessage(`§cExhibit "${name}" not found`);
        }
    }
    toggleAICaretakers(player) {
        this.config.aiCaretakers.enabled = !this.config.aiCaretakers.enabled;
        this.saveConfig();
        const status = this.config.aiCaretakers.enabled ? 'enabled' : 'disabled';
        player.sendMessage(`§aAI Caretakers ${status}`);
    }
    toggleEconomy(player) {
        this.config.economy.enabled = !this.config.economy.enabled;
        this.saveConfig();
        const status = this.config.economy.enabled ? 'enabled' : 'disabled';
        player.sendMessage(`§aEconomy system ${status}`);
    }
    // Display current config to admin
    showConfig(player) {
        player.sendMessage('§e=== Zoo Configuration ===');
        player.sendMessage(`§bZoo Name: §a${this.config.general.zooName}`);
        player.sendMessage(`§bMax Visitors: §a${this.config.general.maxVisitors}`);
        player.sendMessage(`§bDefault Role: §a${this.config.permissions.defaultRole}`);
        player.sendMessage(`§bAI Caretakers: §a${this.config.aiCaretakers.enabled ? 'Enabled' : 'Disabled'}`);
        player.sendMessage(`§bEconomy: §a${this.config.economy.enabled ? 'Enabled' : 'Disabled'}`);
        player.sendMessage(`§bExhibits: §a${Object.keys(this.config.exhibits).length}`);
        for (const [name, exhibit] of Object.entries(this.config.exhibits)) {
            player.sendMessage(`  §e${name}: §a${exhibit.animalTypes.length} animal types`);
        }
    }
    // Export/Import for easy sharing
    exportConfig() {
        return JSON.stringify(this.config, null, 2);
    }
    importConfig(player, configJson) {
        try {
            const newConfig = JSON.parse(configJson);
            this.config = this.mergeDeep(this.getDefaultConfig(), newConfig);
            this.saveConfig();
            player.sendMessage('§aConfiguration imported successfully!');
            return true;
        }
        catch (error) {
            player.sendMessage('§cInvalid configuration format!');
            return false;
        }
    }
    loadConfig() {
        // TODO: Load from world storage when available
        // For now, use default config
        console.log('§eConfig system initialized with default settings');
    }
    saveConfig() {
        // TODO: Save to world storage when available
        // For now, just log that we would save
        console.log('§eConfig saved (placeholder)');
    }
    mergeDeep(target, source) {
        const output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target))
                        Object.assign(output, { [key]: source[key] });
                    else
                        output[key] = this.mergeDeep(target[key], source[key]);
                }
                else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }
}
