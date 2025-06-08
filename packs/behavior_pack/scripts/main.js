import { world, system } from '@minecraft/server';
import { PermissionManager } from './systems/PermissionManager';
import { AICaretakerManager } from './systems/AICaretakerManager';
import { ConfigManager } from './systems/ConfigManager';
import { CommandHandler } from './systems/CommandHandler';
// Initialize all systems
const permissionManager = new PermissionManager();
const aiCaretakerManager = new AICaretakerManager();
const configManager = new ConfigManager();
const commandHandler = new CommandHandler(permissionManager, configManager);
// Main initialization
system.runInterval(() => {
    // Update AI caretakers every 20 ticks (1 second)
    aiCaretakerManager.update();
}, 20);
// Player join event
world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;
    // Initialize player permissions if first time
    if (!permissionManager.hasPermissions(player)) {
        permissionManager.setPlayerRole(player, 'visitor');
        player.sendMessage('§aWelcome to the Zoo! You have visitor permissions.');
    }
    // Show welcome message with current role
    const role = permissionManager.getPlayerRole(player);
    player.sendMessage(`§eYour current role: §b${role}`);
});
// Chat command handler
world.beforeEvents.chatSend.subscribe((event) => {
    const player = event.sender;
    const message = event.message;
    if (message.startsWith('!')) {
        event.cancel = true;
        commandHandler.handleCommand(player, message);
    }
});
console.log('§aZoo Addon loaded successfully!');
