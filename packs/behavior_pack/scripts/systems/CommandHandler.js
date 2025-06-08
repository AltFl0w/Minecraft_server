export class CommandHandler {
    constructor(permissionManager, configManager) {
        this.permissionManager = permissionManager;
        this.configManager = configManager;
    }
    handleCommand(player, message) {
        const args = message.slice(1).split(' '); // Remove '!' and split
        const command = args[0].toLowerCase();
        const params = args.slice(1);
        switch (command) {
            case 'help':
                this.showHelp(player);
                break;
            case 'role':
                this.handleRoleCommand(player, params);
                break;
            case 'promote':
                this.handlePromoteCommand(player, params);
                break;
            case 'config':
                this.handleConfigCommand(player, params);
                break;
            case 'zoo':
                this.handleZooCommand(player, params);
                break;
            case 'ai':
                this.handleAICommand(player, params);
                break;
            case 'exhibit':
                this.handleExhibitCommand(player, params);
                break;
            default:
                player.sendMessage(`§cUnknown command: ${command}. Type !help for available commands.`);
        }
    }
    showHelp(player) {
        const role = this.permissionManager.getPlayerRole(player);
        player.sendMessage('§e=== Zoo Commands ===');
        player.sendMessage('§b!help §7- Show this help message');
        player.sendMessage('§b!role §7- Show your current role');
        player.sendMessage('§b!zoo info §7- Show zoo information');
        if (role === 'builder' || role === 'admin') {
            player.sendMessage('§e--- Builder Commands ---');
            player.sendMessage('§b!exhibit list §7- List all exhibits');
        }
        if (role === 'admin') {
            player.sendMessage('§e--- Admin Commands ---');
            player.sendMessage('§b!promote <player> <role> §7- Change player role');
            player.sendMessage('§b!role list §7- List all player roles');
            player.sendMessage('§b!config show §7- Show current configuration');
            player.sendMessage('§b!config zoo name <name> §7- Set zoo name');
            player.sendMessage('§b!config welcome <message> §7- Set welcome message');
            player.sendMessage('§b!ai toggle §7- Toggle AI caretakers');
            player.sendMessage('§b!ai status §7- Show AI caretaker status');
            player.sendMessage('§b!exhibit add <name> <animals> §7- Add new exhibit');
            player.sendMessage('§b!exhibit remove <name> §7- Remove exhibit');
        }
    }
    handleRoleCommand(player, params) {
        if (params.length === 0) {
            const role = this.permissionManager.getPlayerRole(player);
            player.sendMessage(`§eYour current role: §b${role}`);
            return;
        }
        const subCommand = params[0].toLowerCase();
        if (subCommand === 'list') {
            this.permissionManager.listPlayerRoles(player);
        }
        else {
            player.sendMessage('§cUsage: !role [list]');
        }
    }
    handlePromoteCommand(player, params) {
        if (params.length < 2) {
            player.sendMessage('§cUsage: !promote <player> <role>');
            player.sendMessage('§cRoles: visitor, builder, admin');
            return;
        }
        const targetPlayerName = params[0];
        const newRole = params[1].toLowerCase();
        if (!['visitor', 'builder', 'admin'].includes(newRole)) {
            player.sendMessage('§cInvalid role! Use: visitor, builder, or admin');
            return;
        }
        this.permissionManager.promotePlayer(player, targetPlayerName, newRole);
    }
    handleConfigCommand(player, params) {
        if (!this.permissionManager.canPlayerPerformAction(player, 'canAccessAdminCommands')) {
            player.sendMessage('§cYou do not have permission to use config commands!');
            return;
        }
        if (params.length === 0) {
            player.sendMessage('§cUsage: !config <show|zoo|welcome|export|import>');
            return;
        }
        const subCommand = params[0].toLowerCase();
        switch (subCommand) {
            case 'show':
                this.configManager.showConfig(player);
                break;
            case 'zoo':
                if (params[1] === 'name' && params.length > 2) {
                    const name = params.slice(2).join(' ');
                    this.configManager.setZooName(player, name);
                }
                else {
                    player.sendMessage('§cUsage: !config zoo name <name>');
                }
                break;
            case 'welcome':
                if (params.length > 1) {
                    const message = params.slice(1).join(' ');
                    this.configManager.setWelcomeMessage(player, message);
                }
                else {
                    player.sendMessage('§cUsage: !config welcome <message>');
                }
                break;
            case 'export':
                const configJson = this.configManager.exportConfig();
                player.sendMessage('§aConfiguration exported:');
                player.sendMessage('§7' + configJson.substring(0, 200) + '...');
                player.sendMessage('§e(Full config logged to console)');
                console.log('Zoo Config Export:', configJson);
                break;
            case 'import':
                player.sendMessage('§eConfig import feature coming soon!');
                player.sendMessage('§7For now, modify the config through individual commands.');
                break;
            default:
                player.sendMessage('§cUnknown config command. Use: show, zoo, welcome, export, import');
        }
    }
    handleZooCommand(player, params) {
        if (params.length === 0 || params[0].toLowerCase() === 'info') {
            const zooName = this.configManager.getZooName();
            const welcomeMessage = this.configManager.getWelcomeMessage();
            const exhibits = this.configManager.getAllExhibits();
            const aiEnabled = this.configManager.getAICaretakerConfig().enabled;
            player.sendMessage('§e=== Zoo Information ===');
            player.sendMessage(`§bName: §a${zooName}`);
            player.sendMessage(`§bWelcome: §a${welcomeMessage}`);
            player.sendMessage(`§bExhibits: §a${exhibits.length}`);
            player.sendMessage(`§bAI Caretakers: §a${aiEnabled ? 'Active' : 'Inactive'}`);
            if (exhibits.length > 0) {
                player.sendMessage('§e--- Exhibits ---');
                for (const exhibit of exhibits) {
                    const config = this.configManager.getExhibitConfig(exhibit);
                    player.sendMessage(`§b${exhibit}: §a${config.animalTypes.length} animal types`);
                }
            }
        }
        else {
            player.sendMessage('§cUsage: !zoo [info]');
        }
    }
    handleAICommand(player, params) {
        if (!this.permissionManager.canPlayerPerformAction(player, 'canConfigureAI')) {
            player.sendMessage('§cYou do not have permission to manage AI caretakers!');
            return;
        }
        if (params.length === 0) {
            player.sendMessage('§cUsage: !ai <toggle|status>');
            return;
        }
        const subCommand = params[0].toLowerCase();
        switch (subCommand) {
            case 'toggle':
                this.configManager.toggleAICaretakers(player);
                break;
            case 'status':
                const aiConfig = this.configManager.getAICaretakerConfig();
                player.sendMessage('§e=== AI Caretaker Status ===');
                player.sendMessage(`§bEnabled: §a${aiConfig.enabled}`);
                player.sendMessage(`§bCleaning Interval: §a${aiConfig.cleaningInterval} ticks`);
                player.sendMessage(`§bFeeding Interval: §a${aiConfig.feedingInterval} ticks`);
                player.sendMessage(`§bWork Distance: §a${aiConfig.maxWorkDistance} blocks`);
                player.sendMessage(`§bWork Speed: §a${aiConfig.workSpeed}x`);
                break;
            default:
                player.sendMessage('§cUnknown AI command. Use: toggle, status');
        }
    }
    handleExhibitCommand(player, params) {
        if (params.length === 0) {
            player.sendMessage('§cUsage: !exhibit <list|add|remove>');
            return;
        }
        const subCommand = params[0].toLowerCase();
        switch (subCommand) {
            case 'list':
                const exhibits = this.configManager.getAllExhibits();
                player.sendMessage('§e=== Zoo Exhibits ===');
                if (exhibits.length === 0) {
                    player.sendMessage('§cNo exhibits configured yet.');
                    return;
                }
                for (const exhibit of exhibits) {
                    const config = this.configManager.getExhibitConfig(exhibit);
                    player.sendMessage(`§b${exhibit}:`);
                    player.sendMessage(`  §7Animals: §a${config.animalTypes.join(', ')}`);
                    player.sendMessage(`  §7Feeding: §a${config.feedingSchedule.join(', ')} o'clock`);
                    player.sendMessage(`  §7Cleaning: §aEvery ${config.cleaningInterval} minutes`);
                    player.sendMessage(`  §7Max Animals: §a${config.maxAnimals}`);
                }
                break;
            case 'add':
                if (!this.permissionManager.canPlayerPerformAction(player, 'canAccessAdminCommands')) {
                    player.sendMessage('§cYou do not have permission to add exhibits!');
                    return;
                }
                if (params.length < 3) {
                    player.sendMessage('§cUsage: !exhibit add <name> <animal1,animal2,...>');
                    player.sendMessage('§cExample: !exhibit add "Aquarium" minecraft:fish,minecraft:squid');
                    return;
                }
                const exhibitName = params[1];
                const animalString = params.slice(2).join(' ');
                const animalTypes = animalString.split(',').map(s => s.trim());
                this.configManager.addExhibit(player, exhibitName, animalTypes);
                break;
            case 'remove':
                if (!this.permissionManager.canPlayerPerformAction(player, 'canAccessAdminCommands')) {
                    player.sendMessage('§cYou do not have permission to remove exhibits!');
                    return;
                }
                if (params.length < 2) {
                    player.sendMessage('§cUsage: !exhibit remove <name>');
                    return;
                }
                const nameToRemove = params[1];
                this.configManager.removeExhibit(player, nameToRemove);
                break;
            default:
                player.sendMessage('§cUnknown exhibit command. Use: list, add, remove');
        }
    }
}
