import { world, system } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';

// Admin permission check
function isAdmin(player) {
    return player.hasTag('admin') || player.hasTag('owner') || player.isOp();
}

// Main Command Center UI
function showCommandCenter(player) {
    if (!isAdmin(player)) {
        player.sendMessage('§c[Zoo Command Center] Access Denied - Admin Only!');
        return;
    }

    const form = new ActionFormData()
        .title('§6§l🏛️ Zoo Command Center')
        .body('§7Welcome to the Zoo Management System\n§aSelect a category:')
        .button('§2🛡️ Security Systems', 'textures/items/security_camera')
        .button('§6🔧 Give Items', 'textures/items/diamond')
        .button('§3🐾 Animal Management', 'textures/items/spawn_egg')
        .button('§5👥 Player Management', 'textures/items/player_head')
        .button('§e🏗️ Building Tools', 'textures/items/golden_pickaxe')
        .button('§c⚠️ Emergency Controls', 'textures/items/redstone');

    form.show(player).then((response) => {
        if (response.canceled) return;
        
        switch (response.selection) {
            case 0: showSecurityMenu(player); break;
            case 1: showItemMenu(player); break;
            case 2: showAnimalMenu(player); break;
            case 3: showPlayerMenu(player); break;
            case 4: showBuildingMenu(player); break;
            case 5: showEmergencyMenu(player); break;
        }
    });
}

// Security Systems Menu
function showSecurityMenu(player) {
    const form = new ActionFormData()
        .title('§6🛡️ Security Systems')
        .body('§7Manage zoo security and surveillance')
        .button('§a📹 Give Security Camera', 'textures/items/security_camera')
        .button('§a🔐 Give Keypad', 'textures/items/keypad')
        .button('§a🎯 Give Turret', 'textures/items/turret')
        .button('§a💳 Give Keycard', 'textures/items/keycard')
        .button('§a🚪 Give Reinforced Door', 'textures/items/reinforced_door')
        .button('§a💣 Give Mine', 'textures/items/mine')
        .button('§a🛡️ Give Security Table', 'textures/items/scb_table')
        .button('§c🔙 Back to Main Menu');

    form.show(player).then((response) => {
        if (response.canceled) return;
        
        switch (response.selection) {
            case 0: 
                player.runCommand('give @s security_camera 1');
                player.sendMessage('§a[Security] Security Camera given!');
                break;
            case 1:
                player.runCommand('give @s keypad 1');
                player.sendMessage('§a[Security] Keypad given!');
                break;
            case 2:
                player.runCommand('give @s turret 1');
                player.sendMessage('§a[Security] Turret given!');
                break;
            case 3:
                player.runCommand('give @s keycard 1');
                player.sendMessage('§a[Security] Keycard given!');
                break;
            case 4:
                player.runCommand('give @s reinforced_door_item 1');
                player.sendMessage('§a[Security] Reinforced Door given!');
                break;
            case 5:
                player.runCommand('give @s mine 1');
                player.sendMessage('§a[Security] Mine given!');
                break;
            case 6:
                player.runCommand('give @s security_table 1');
                player.sendMessage('§a[Security] Security Table given!');
                break;
            case 7:
                showCommandCenter(player);
                return;
        }
        showSecurityMenu(player); // Show menu again for easy access
    });
}

// Items Menu
function showItemMenu(player) {
    const form = new ActionFormData()
        .title('§6🔧 Give Items')
        .body('§7Quick access to useful items')
        .button('§a🔫 Give Weapons', 'textures/items/ak47')
        .button('§a🪑 Give Furniture', 'textures/items/chair')
        .button('§a🏗️ Give Building Blocks', 'textures/items/concrete')
        .button('§a🚗 Spawn Vehicle', 'textures/items/car')
        .button('§c🔙 Back to Main Menu');

    form.show(player).then((response) => {
        if (response.canceled) return;
        
        switch (response.selection) {
            case 0: showWeaponsMenu(player); break;
            case 1: showFurnitureMenu(player); break;
            case 2: showBlocksMenu(player); break;
            case 3:
                player.runCommand('summon bugatti_centodieci ~ ~ ~');
                player.sendMessage('§a[Items] Vehicle spawned!');
                break;
            case 4:
                showCommandCenter(player);
                return;
        }
    });
}

// Animal Management Menu
function showAnimalMenu(player) {
    const form = new ActionFormData()
        .title('§3🐾 Animal Management')
        .body('§7Manage zoo animals and spawning')
        .button('§a🦁 Spawn Big Cats', 'textures/items/spawn_egg')
        .button('§a🐘 Spawn Large Animals', 'textures/items/spawn_egg')
        .button('§a🐧 Spawn Birds', 'textures/items/spawn_egg')
        .button('§a🐠 Spawn Aquatic', 'textures/items/spawn_egg')
        .button('§a🦎 Spawn Reptiles', 'textures/items/spawn_egg')
        .button('§c🔙 Back to Main Menu');

    form.show(player).then((response) => {
        if (response.canceled) return;
        
        switch (response.selection) {
            case 0:
                player.runCommand('summon wa:lion ~ ~ ~');
                player.runCommand('summon wa:tiger ~ ~1 ~');
                player.sendMessage('§a[Animals] Big cats spawned!');
                break;
            case 1:
                player.runCommand('summon wa:elephant ~ ~ ~');
                player.runCommand('summon wa:giraffe ~ ~1 ~');
                player.sendMessage('§a[Animals] Large animals spawned!');
                break;
            case 2:
                player.runCommand('summon wa:eagle ~ ~ ~');
                player.runCommand('summon wa:penguin ~ ~1 ~');
                player.sendMessage('§a[Animals] Birds spawned!');
                break;
            case 3:
                player.runCommand('summon wa:whale ~ ~ ~');
                player.runCommand('summon wa:seal ~ ~1 ~');
                player.sendMessage('§a[Animals] Aquatic animals spawned!');
                break;
            case 4:
                player.runCommand('summon wa:crocodile ~ ~ ~');
                player.runCommand('summon wa:komodo_dragon ~ ~1 ~');
                player.sendMessage('§a[Animals] Reptiles spawned!');
                break;
            case 5:
                showCommandCenter(player);
                return;
        }
        showAnimalMenu(player);
    });
}

// Player Management Menu
function showPlayerMenu(player) {
    const form = new ActionFormData()
        .title('§5👥 Player Management')
        .body('§7Manage player permissions and roles')
        .button('§a👑 Make Admin', 'textures/items/golden_crown')
        .button('§a🛠️ Make Manager', 'textures/items/iron_sword')
        .button('§a🏗️ Make Builder', 'textures/items/golden_pickaxe')
        .button('§a👤 Make Visitor', 'textures/items/leather_helmet')
        .button('§c❌ Remove Permissions', 'textures/items/barrier')
        .button('§c🔙 Back to Main Menu');

    form.show(player).then((response) => {
        if (response.canceled) return;
        
        if (response.selection === 5) {
            showCommandCenter(player);
            return;
        }
        
        // Show player selection form
        showPlayerSelection(player, response.selection);
    });
}

// Player Selection for permissions
function showPlayerSelection(admin, actionType) {
    const players = world.getAllPlayers();
    const form = new ActionFormData()
        .title('§5Select Player')
        .body('§7Choose a player to modify permissions:');
    
    players.forEach(p => {
        form.button(p.name, 'textures/items/player_head');
    });
    
    form.show(admin).then((response) => {
        if (response.canceled) return;
        
        const targetPlayer = players[response.selection];
        const actions = ['admin', 'manager', 'builder', 'visitor', 'remove'];
        const action = actions[actionType];
        
        if (action === 'remove') {
            targetPlayer.removeTag('admin');
            targetPlayer.removeTag('manager');
            targetPlayer.removeTag('builder');
            targetPlayer.removeTag('visitor');
            admin.sendMessage(`§c[Permissions] Removed all permissions from ${targetPlayer.name}`);
        } else {
            // Remove old tags first
            targetPlayer.removeTag('admin');
            targetPlayer.removeTag('manager');
            targetPlayer.removeTag('builder');
            targetPlayer.removeTag('visitor');
            
            // Add new tag
            targetPlayer.addTag(action);
            admin.sendMessage(`§a[Permissions] Set ${targetPlayer.name} as ${action}`);
            targetPlayer.sendMessage(`§a[Zoo] You are now a ${action}!`);
        }
    });
}

// Building Tools Menu
function showBuildingMenu(player) {
    const form = new ActionFormData()
        .title('§e🏗️ Building Tools')
        .body('§7Tools for construction and design')
        .button('§a📐 Give Hologram Blocks', 'textures/items/hologram')
        .button('§a🧱 Give Concrete Varieties', 'textures/items/concrete')
        .button('§a🪟 Give Glass Types', 'textures/items/glass')
        .button('§a🚧 Give Fencing Options', 'textures/items/fence')
        .button('§a⚡ Quick Build Mode', 'textures/items/golden_pickaxe')
        .button('§c🔙 Back to Main Menu');

    form.show(player).then((response) => {
        if (response.canceled) return;
        
        switch (response.selection) {
            case 0:
                for (let i = 0; i < 16; i++) {
                    player.runCommand(`give @s hologram_block ${i} 64`);
                }
                player.sendMessage('§a[Building] Hologram blocks given!');
                break;
            case 1:
                const concreteColors = ['white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black'];
                concreteColors.forEach(color => {
                    player.runCommand(`give @s ${color}_concrete 64`);
                });
                player.sendMessage('§a[Building] Concrete varieties given!');
                break;
            case 2:
                player.runCommand('give @s glass 64');
                player.runCommand('give @s tinted_glass 64');
                player.runCommand('give @s glass_pane 64');
                player.sendMessage('§a[Building] Glass types given!');
                break;
            case 3:
                player.runCommand('give @s oak_fence 64');
                player.runCommand('give @s iron_bars 64');
                player.runCommand('give @s chain 64');
                player.sendMessage('§a[Building] Fencing options given!');
                break;
            case 4:
                player.addTag('quickbuild');
                player.sendMessage('§a[Building] Quick build mode enabled! Break/place blocks instantly.');
                break;
            case 5:
                showCommandCenter(player);
                return;
        }
        showBuildingMenu(player);
    });
}

// Emergency Controls Menu
function showEmergencyMenu(player) {
    const form = new ActionFormData()
        .title('§c⚠️ Emergency Controls')
        .body('§7Emergency zoo management controls')
        .button('§c🚨 Lockdown Mode', 'textures/items/redstone')
        .button('§c🔥 Clear All Hostile Mobs', 'textures/items/fire_charge')
        .button('§c🌙 Set Time to Day', 'textures/items/clock')
        .button('§c☀️ Clear Weather', 'textures/items/sun')
        .button('§c🏥 Heal All Players', 'textures/items/golden_apple')
        .button('§c🔙 Back to Main Menu');

    form.show(player).then((response) => {
        if (response.canceled) return;
        
        switch (response.selection) {
            case 0:
                world.sendMessage('§c[EMERGENCY] Zoo is now in lockdown mode!');
                player.runCommand('gamemode adventure @a[tag=!admin]');
                player.sendMessage('§c[Emergency] Lockdown activated!');
                break;
            case 1:
                player.runCommand('kill @e[type=!player,family=monster]');
                player.sendMessage('§a[Emergency] All hostile mobs cleared!');
                break;
            case 2:
                player.runCommand('time set day');
                player.sendMessage('§a[Emergency] Time set to day!');
                break;
            case 3:
                player.runCommand('weather clear');
                player.sendMessage('§a[Emergency] Weather cleared!');
                break;
            case 4:
                player.runCommand('effect @a instant_health 1 255');
                player.runCommand('effect @a saturation 1 255');
                world.sendMessage('§a[Emergency] All players healed!');
                break;
            case 5:
                showCommandCenter(player);
                return;
        }
        showEmergencyMenu(player);
    });
}

// Command Center Block interaction
world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    const { player, block } = event;
    
    if (block.typeId === 'zoo:command_center') {
        event.cancel = true;
        showCommandCenter(player);
    }
});

// Chat command to open command center
world.beforeEvents.chatSend.subscribe((event) => {
    const { sender, message } = event;
    
    if (message === '!cc' || message === '!commandcenter') {
        event.cancel = true;
        showCommandCenter(sender);
    }
});

// Initialize
system.run(() => {
    world.sendMessage('§a[Zoo Command Center] System loaded! Use !cc to open or place a Command Center block.');
}); 