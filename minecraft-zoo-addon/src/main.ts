import { world, system } from '@minecraft/server';
import { PermissionManager } from './systems/PermissionManager';
import { AICaretakerManager } from './systems/AICaretakerManager';
import { ConfigManager } from './systems/ConfigManager';
import { CommandHandler } from './systems/CommandHandler';
import { initializeLogBasedTests } from './tests/LogBasedTests';

console.log('Zoo Addon initializing...');

// Initialize systems
const permissionManager = new PermissionManager();
const aiCaretakerManager = new AICaretakerManager();
const configManager = new ConfigManager();
const commandHandler = new CommandHandler(permissionManager, configManager);

console.log('All systems initialized');

// Track initialized players and admin status
let initializedPlayers = new Set<string>();
let hasAdmin = false;

// Check if we already have an admin on startup
world.getAllPlayers().forEach(player => {
    if (permissionManager.getPlayerRole(player) === 'admin') {
        hasAdmin = true;
    }
});

// Show help commands to player
function showHelpToPlayer(player: any) {
    const role = permissionManager.getPlayerRole(player);
    
    player.sendMessage('§e=== Zoo Commands ===');
    player.sendMessage('§7(Commands are currently in development)');
    player.sendMessage(`§eYour role: §b${role}`);
    
    if (role === 'admin') {
        player.sendMessage('§6=== Admin Info ===');
        player.sendMessage('§aYou have full admin access!');
        player.sendMessage('§eZoo Name: §b' + configManager.getZooName());
        player.sendMessage('§eAI Caretakers: §b' + (configManager.getAICaretakerConfig().enabled ? 'Active' : 'Inactive'));
        player.sendMessage('§eExhibits: §b' + configManager.getAllExhibits().length);
    }
}

// Initialize players when they interact (since events may not be available)
function initializePlayer(player: any) {
    if (!initializedPlayers.has(player.id)) {
        initializedPlayers.add(player.id);
        
        if (!permissionManager.hasPermissions(player)) {
            // If no admin exists yet, make this player admin
            if (!hasAdmin) {
                permissionManager.setPlayerRole(player, 'admin');
                hasAdmin = true;
                player.sendMessage('§6🎉 Welcome to the Zoo! You are now the ADMIN!');
                
                // Show admin info immediately (no setTimeout)
                showHelpToPlayer(player);
                
            } else {
                permissionManager.setPlayerRole(player, 'visitor');
                player.sendMessage('§aWelcome to the Zoo! You have visitor permissions.');
            }
        }
        
        const role = permissionManager.getPlayerRole(player);
        player.sendMessage(`§eYour current role: §b${role}`);
    }
}

// Main game loop
system.runInterval(() => {
    // Update AI caretakers every 20 ticks (1 second)
    aiCaretakerManager.update();
}, 20);

// Check for new players every 5 seconds
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        initializePlayer(player);
    }
}, 100);

// Send periodic status updates to admin
let statusCounter = 0;
system.runInterval(() => {
    statusCounter++;
    if (statusCounter >= 1200) { // Every 60 seconds
        statusCounter = 0;
        for (const player of world.getAllPlayers()) {
            if (permissionManager.getPlayerRole(player) === 'admin') {
                player.sendMessage('§7[Zoo Status] AI Caretakers active, all systems running');
            }
        }
    }
}, 20);

console.log('Zoo Addon loaded successfully!');

// Initialize log-based testing system
initializeLogBasedTests(); 