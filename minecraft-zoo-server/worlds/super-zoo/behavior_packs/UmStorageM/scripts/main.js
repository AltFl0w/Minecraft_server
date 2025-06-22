import { world, ItemStack } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";

// Item Name Mapping
const ITEM_NAME_MAP = {
    "minecraft:iron_ingot": "Iron Ingot",
    "minecraft:diamond": "Diamond",
    "minecraft:gold_ingot": "Gold Ingot",
    "um:storage_connector": "Storage Connector",
    "minecraft:apple": "Apple",
    "minecraft:coal": "Coal",
    "minecraft:stone": "Stone",
    "minecraft:dirt": "Dirt",
    "minecraft:cobblestone": "Cobblestone",
    "minecraft:chest": "Chest",
    "minecraft:crafting_table": "Crafting Table",
    "minecraft:furnace": "Furnace"
};

// Fallback icon paths
const ICON_PATHS = {
    default: "textures/ui/backup_noline.png",
    hotbar: "textures/ui/hotbar_0.png",
    lena: "textures/ui/download_backup.png",
    add: "textures/ui/color_plus.png",
    remove: "textures/ui/book_trash_default.png"
};

// Maximum number of connections a storage stick can hold
const MAX_CONNECTIONS = 5;

// Utility Functions
function sendMessage(player, message, color = "a") {
    player.sendMessage(`§${color}[Cloud Storage] ${message}`);
}

function getPlayerInventory(player) {
    return player.getComponent("inventory")?.container;
}

function playSuccessEffect(player) {
    player.playSound("entity.experience_orb.pickup", { volume: 1, pitch: 1.5 });
}

function playErrorEffect(player) {
    player.playSound("entity.villager.no", { volume: 1, pitch: 0.8 });
}

function getFriendlyName(itemId) {
    return ITEM_NAME_MAP[itemId] || itemId.split(":")[1] || itemId;
}

// Lore Handling Functions
function parseLoreEntry(entry) {
    try {
        const data = JSON.parse(entry);
        return { 
            pos: data.pos, 
            name: data.name || `Location at ${data.pos}`,
            type: data.type || "loader"
        };
    } catch {
        return {
            pos: entry,
            name: `Location at ${entry}`,
            type: "loader"
        };
    }
}

function createLoreEntry(pos, name) {
    return JSON.stringify({ pos, name });
}

// Main Event: Block Hit Interaction
world.afterEvents.entityHitBlock.subscribe(event => {
    const player = event.damagingEntity;
    const block = event.hitBlock;
    


    
    
    

    if (player?.typeId !== "minecraft:player" || !block) return;

    const inv = getPlayerInventory(player);
    const item = inv.getItem(player.selectedSlotIndex);

    // Handle Storage Connector Stick interactions
    if (item?.typeId === "um:storage_remont" && block.typeId != "um:storge") {

            openStorageFromStick(player);
            }
      if(item?.typeId === "um:storage_remont" && block.typeId == "um:storge"){
           
            addLoaderPositionToStick(player, block);
            
        }
        
    

    // Handle Storage Connector item
    if (item?.typeId === "um:storage_connector") {
        if (block.typeId === "minecraft:chest") {
            addChestPositionToStick(player, block);
        } else if (block.typeId === "um:storge") {
            handleLoaderStickClick(player, block, item, inv);
        }
        return;
    }

    // Direct access to Cloud Loader
    if (block.typeId === "um:storge") {
        openLoaderMenu(player, block, true);
    }
});

// Add Loader Position to Stick with Naming
function addLoaderPositionToStick(player, block) {
    const inv = getPlayerInventory(player);
    const item = inv.getItem(player.selectedSlotIndex);
    const lore = item?.getLore() || [];

    if (lore.length >= MAX_CONNECTIONS) {
        sendMessage(player, `You can only link up to ${MAX_CONNECTIONS} storages per stick!`, "c");
        playErrorEffect(player);
        return;
    }

    const position = `${block.x} ${block.y} ${block.z}`;

    // Check if already exists
    const exists = lore.some(entry => {
        const data = parseLoreEntry(entry);
        return data.pos === position;
    });

    if (exists) {
        sendMessage(player, "This Cloud Loader is already linked!", "c");
        playErrorEffect(player);
        return;
    }

    new ModalFormData()
        .title("Name this Link")
        .textField("Enter a display name:", `My ${block.typeId === "minecraft:chest" ? "Chest" : "Loader"}`)
        .show(player).then(res => {
            if (res.canceled) return;

            const name = res.formValues[0]?.trim() || 
                `Linked ${block.typeId === "minecraft:chest" ? "Chest" : "Loader"} at ${position}`;

            lore.push(createLoreEntry(
                position, 
                name,
                block.typeId === "minecraft:chest" ? "chest" : "loader"
            ));

            item.setLore(lore);
            inv.setItem(player.selectedSlotIndex, item);

            sendMessage(player, `Successfully linked: §b${name}`);
            playSuccessEffect(player);
        });
}
// Open Storage from Stick
function openStorageFromStick(player) {
    const inv = getPlayerInventory(player);
    const item = inv.getItem(player.selectedSlotIndex);
    const lore = item?.getLore();

    if (!lore?.length) {
        sendMessage(player, "Storage Stick not linked!", "c");
        playErrorEffect(player);
        return;
    }

    const form = new ActionFormData()
        .title("Linked Storage Locations")
        .body("Select a location to access:");

    lore.forEach(entry => {
        const data = parseLoreEntry(entry);
        form.button(data.name, ICON_PATHS[data.type === "chest" ? "hotbar" : "lena"]);
    });

    form.show(player).then(res => {
        if (res.canceled || res.selection === undefined) return;
        
        const selectedEntry = parseLoreEntry(lore[res.selection]);
        const [x, y, z] = selectedEntry.pos.split(" ").map(Number);
        const block = world.getDimension("overworld").getBlock({ x, y, z });

        sendMessage(player, `Selected: §b${selectedEntry.name}§r\nPosition: §a${x} ${y} ${z}`);

        if (block?.typeId === "um:storge") {
            openLoaderMenu(player, block, false);
        } else if (block?.typeId === "minecraft:chest") {
            showChestStatus(player, [selectedEntry.pos]);
        } else {
            sendMessage(player, "Linked block missing!", "c");
            playErrorEffect(player);
        }
    });
}

// Handle Storage Connector application
function handleLoaderStickClick(player, block, item, inv) {
    const lore = item.getLore() || [];
    if (!lore.length) {
        sendMessage(player, "No linked chests!", "c");
        playErrorEffect(player);
        return;
    }

    const positionKey = `cloudstorage:loader_${block.x},${block.y},${block.z}`;
    world.setDynamicProperty(positionKey, JSON.stringify(lore));
    inv.setItem(player.selectedSlotIndex, null);
    
    sendMessage(player, "Storage Connector configured!");
    playSuccessEffect(player);
}

// Loader Menu System
function openLoaderMenu(player, block, showRemove) {
    const positionKey = `cloudstorage:loader_${block.x},${block.y},${block.z}`;
    const chestData = world.getDynamicProperty(positionKey);

    if (!chestData) {
      let block_pos = `${block.location.x} ${block.location.y} ${block.location.z}`
        sendMessage(player, "No connected chests!", "c");
        playErrorEffect(player);
                new ActionFormData()
      .title("Remove Storage Block")
      .body(`Remove Storage \n pos: ${block_pos}`)
      .button("Remove Storage")
      
    .show(player).then(res => {
        if(res.canceled) return;
          removeLoader(block, player)
        
      })
        return;
    }

    const parsedData = JSON.parse(chestData).map(parseLoreEntry);
    const connectionCount = parsedData.length;

    const form = new ActionFormData()
        .title("Cloud Loader Interface")
        .body(`Connected to ${connectionCount} chests`)
        .button("Withdraw Items", ICON_PATHS.lena)
        .button("Deposit Items", ICON_PATHS.add)
        .button("Chest Network Status", ICON_PATHS.hotbar);

    if (showRemove) form.button("Remove Loader", ICON_PATHS.remove);

    form.show(player).then(res => {
        if (res.canceled) return;
        
        switch(res.selection) {
            case 0: 
                showChestItems(player, parsedData);
                break;
            case 1: 
                sendItemsToChests(player, parsedData);
                break;
            case 2: 
                showChestStatus(player, parsedData);
                break;
            case 3: 
                removeLoader(block, player); 
                break;
        }
    });
}

// Inventory Management Functions
function sendItemsToChests(player, lore) {
    const inv = getPlayerInventory(player);
    const items = Array.from({ length: inv.size }, (_, i) => inv.getItem(i))
        .filter(Boolean)
        .map((item, slot) => ({ slot, item }));

    if (!items.length) {
        sendMessage(player, "Inventory empty!", "c");
        playErrorEffect(player);
        return;
    }

    const form = new ActionFormData().title("Select Item");
    items.forEach(({ item }) => form.button(`${item.amount}x ${getFriendlyName(item.typeId)}`, ICON_PATHS.hotbar));
    
    form.show(player).then(res => {
        if (res.canceled || res.selection === undefined) return;
        selectDepositAmount(player, items[res.selection], lore);
    });
}

function selectDepositAmount(player, { slot, item }, lore) {
    new ModalFormData()
        .title(`Deposit ${getFriendlyName(item.typeId)}`)
        .slider("Amount", 1, item.amount, 1)
        .show(player)
        .then(res => {
            if (res.canceled) return;
            
            const amount = res.formValues[0];
            if (distributeItems(item.typeId, amount, lore)) {
                adjustPlayerInventory(player, slot, item, amount);
                sendMessage(player, `Deposited ${amount}x ${getFriendlyName(item.typeId)}!`);
                playSuccessEffect(player);
            } else {
                sendMessage(player, "Chests full!", "c");
                playErrorEffect(player);
            }
        });
}

function distributeItems(itemId, amount, lore) {
    for (const entry of lore) {
        const [x, y, z] = entry.pos.split(" ").map(Number);
        const block = world.getDimension("overworld").getBlock({ x, y, z });
        const chest = block?.getComponent("inventory")?.container;
        
        if (!chest || block.typeId !== "minecraft:chest") continue;

        for (let i = 0; i < chest.size && amount > 0; i++) {
            const slotItem = chest.getItem(i);
            
            if (slotItem?.typeId === itemId) {
                const space = slotItem.maxAmount - slotItem.amount;
                if (space > 0) {
                    const transfer = Math.min(space, amount);
                    slotItem.amount += transfer;
                    chest.setItem(i, slotItem);
                    amount -= transfer;
                }
            } else if (!slotItem) {
                const transfer = Math.min(64, amount);
                chest.setItem(i, new ItemStack(itemId, transfer));
                amount -= transfer;
            }
        }
    }
    return amount === 0;
}

// Withdrawal System
function showChestItems(player, lore) {
    const items = scanChests(lore);
    showItemMenu(player, items, lore, "");
}

function showItemMenu(player, items, lore, searchQuery = "") {
    const filteredItems = searchQuery
        ? new Map(
              [...items].filter(([id]) =>
                  getFriendlyName(id).toLowerCase().includes(searchQuery.toLowerCase())
              )
          )
        : items;

    if (filteredItems.size === 0 && searchQuery) {
        sendMessage(player, "No items match your search!", "c");
        playErrorEffect(player);
        return showItemMenu(player, items, lore); // Return to full menu if no results
    }

    const form = new ActionFormData()
        .title("Available Items")
        .body(searchQuery ? `Showing results for "${searchQuery}"` : "Select an item to withdraw:");

    // Add Search button at the top
    form.button("Search Items", "textures/ui/magnifyingGlass.png");

    // Add item buttons
    filteredItems.forEach((count, id) =>
        form.button(`${count}x ${getFriendlyName(id)}`, ICON_PATHS.default)
    );

    form.show(player).then(res => {
        if (res.canceled || res.selection === undefined) return;

        // Handle Search button (index 0)
        if (res.selection === 0) {
            new ModalFormData()
                .title("Search Items")
                .textField("Enter item name (e.g., Iron Ingot):", "")
                .show(player)
                .then(searchRes => {
                    if (searchRes.canceled || !searchRes.formValues[0]) {
                        // If canceled or empty, return to full menu
                        showItemMenu(player, items, lore);
                        return;
                    }
                    const newSearchQuery = searchRes.formValues[0].trim();
                    showItemMenu(player, items, lore, newSearchQuery);
                });
        } else {
            // Adjust for Search button offset (item buttons start at index 1)
            const selectedItem = [...filteredItems][res.selection - 1];
            if (selectedItem) {
                initiateWithdrawal(player, selectedItem, lore);
            }
        }
    });
}

function scanChests(lore) {
    const items = new Map();
    
    for (const entry of lore) {
        const [x, y, z] = entry.pos.split(" ").map(Number);
        const block = world.getDimension("overworld").getBlock({ x, y, z });
        const chest = block?.getComponent("inventory")?.container;
        
        if (!chest || block.typeId !== "minecraft:chest") continue;
        
        for (let i = 0; i < chest.size; i++) {
            const item = chest.getItem(i);
            if (item) items.set(item.typeId, (items.get(item.typeId) || 0) + item.amount);
        }
    }
    return items;
}

function initiateWithdrawal(player, [itemId, total], lore) {
    new ModalFormData()
        .title(`Withdraw ${getFriendlyName(itemId)}`)
        .slider("Amount", 1, total, 1)
        .show(player)
        .then(res => {
            if (res.canceled) return;
            
            const amount = res.formValues[0];
            try {
                getPlayerInventory(player).addItem(new ItemStack(itemId, amount));
                removeItemsFromChests(itemId, amount, lore);
                sendMessage(player, `Withdrew ${amount}x ${getFriendlyName(itemId)}!`);
                playSuccessEffect(player);
            } catch {
                sendMessage(player, "Inventory full!", "c");
                playErrorEffect(player);
            }
        });
}

function removeItemsFromChests(itemId, amount, lore) {
    for (const entry of lore) {
        const [x, y, z] = entry.pos.split(" ").map(Number);
        const block = world.getDimension("overworld").getBlock({ x, y, z });
        const chest = block?.getComponent("inventory")?.container;
        
        if (!chest || block.typeId !== "minecraft:chest") continue;
        
        for (let i = 0; i < chest.size && amount > 0; i++) {
            const item = chest.getItem(i);
            if (item?.typeId !== itemId) continue;
            
            if (item.amount > amount) {
                item.amount -= amount;
                chest.setItem(i, item);
                amount = 0;
            } else {
                amount -= item.amount;
                chest.setItem(i, null);
            }
        }
    }
}

// Helper Functions
function adjustPlayerInventory(player, slot, item, amount) {
    const inv = getPlayerInventory(player);
    if (item.amount === amount) {
        inv.setItem(slot, null);
    } else {
        item.amount -= amount;
        inv.setItem(slot, item);
    }
}

function showChestStatus(player, lore) {
    let status = "§6Connected Storage:\n§r";
    lore.forEach((entry, i) => {
        const [x, y, z] = entry.pos.split(" ").map(Number);
        const block = world.getDimension("overworld").getBlock({ x, y, z });
        
        status += `\n§l${i+1}. §r§b${entry.name}§r\n`;
        status += `Position: §a${x} ${y} ${z}§r\n`;
        
        if (block?.typeId === "minecraft:chest") {
            const chest = block.getComponent("inventory").container;
            const used = Array.from({ length: chest.size }, (_, i) => chest.getItem(i)).filter(Boolean).length;
            status += `Status: §2${used}/${chest.size} slots used§r\n`;
        } else {
            status += "Status: §cMissing!§r\n";
        }
    });
    
    new MessageFormData()
        .title("Storage Network Status")
        .body(status)
        .button1("OK")
        .show(player);
}

function removeLoader(block, player) {
    block.setType("minecraft:air");
    player.runCommand(`give @p um:storge`)
    world.setDynamicProperty(`cloudstorage:loader_${block.x},${block.y},${block.z}`, undefined);
    sendMessage(player, "Cloud Loader removed!");
    playSuccessEffect(player);
}

function addChestPositionToStick(player, block) {
    const inv = getPlayerInventory(player);
    const item = inv.getItem(player.selectedSlotIndex);
    const lore = item?.getLore() || [];

    if (lore.length >= MAX_CONNECTIONS) {
        sendMessage(player, `Max ${MAX_CONNECTIONS} chests per connector!`, "c");
        playErrorEffect(player);
        return;
    }

    addLoaderPositionToStick(player, block); // Reuse the naming function
}