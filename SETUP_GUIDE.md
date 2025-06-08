# 🚀 Zoo Addon Setup Guide

This guide will help you get your Minecraft Zoo Addon up and running on any Bedrock platform (Nintendo Switch, iPad, PC, etc.).

## 📋 Prerequisites

- Minecraft Bedrock Edition
- A world where you want to add the zoo addon
- Basic understanding of how to navigate Minecraft settings

## 🎯 Step-by-Step Installation

### Step 1: Prepare Your World

1. **Open Minecraft Bedrock Edition**
2. **Create a new world** or **select an existing world**
3. **Make sure the world has "Cheats" enabled**:
   - Go to World Settings
   - Enable "Activate Cheats"
   - Enable "Holiday Creator Features" (if available)

### Step 2: Install the Addon

#### Option A: Direct Installation (Recommended)
1. **Copy the addon files** to your world folder:
   ```
   [Your World Folder]/
   ├── behavior_packs/
   │   └── zoo-addon-bp/  (copy from packs/behavior_pack/)
   └── resource_packs/
       └── zoo-addon-rp/  (copy from packs/resource_pack/)
   ```

#### Option B: Global Installation
1. **Copy to Minecraft's addon folder**:
   - **Windows**: `%localappdata%/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/`
   - **iOS**: Use a file manager app to access Minecraft's documents
   - **Android**: `/storage/emulated/0/games/com.mojang/`

### Step 3: Enable the Addon

1. **Open your world settings**
2. **Go to "Behavior Packs"**:
   - Click "Add Packs"
   - Find "Zoo Addon - Behavior Pack"
   - Click "Activate"
3. **Go to "Resource Packs"**:
   - Click "Add Packs"
   - Find "Zoo Addon - Resource Pack"
   - Click "Activate"
4. **Save and exit** world settings

### Step 4: First Launch

1. **Join your world**
2. **You should see**: `§aZoo Addon loaded successfully!` in chat
3. **Set yourself as admin** (important!):
   ```
   !promote YourMinecraftUsername admin
   ```
4. **Test the addon**:
   ```
   !help
   !zoo info
   !config show
   ```

## 🎮 Quick Commands Test

Try these commands to make sure everything is working:

```
!help                    # Show all available commands
!role                    # Check your role (should be admin)
!zoo info               # Show zoo information
!config show            # Display current configuration
!exhibit list           # List configured exhibits
!ai status              # Check AI caretaker status
```

## 🔧 Configuration

### Setting Up Your Zoo

1. **Name your zoo**:
   ```
   !config zoo name "Brandon's Amazing Zoo"
   ```

2. **Set a welcome message**:
   ```
   !config welcome "Welcome to the best zoo in Minecraft!"
   ```

3. **Add exhibits** (examples):
   ```
   !exhibit add "Safari" minecraft:lion,minecraft:elephant
   !exhibit add "Farm" minecraft:cow,minecraft:pig,minecraft:sheep
   !exhibit add "Arctic" minecraft:polar_bear,minecraft:fox
   ```

### Managing Players

1. **Promote friends to builders**:
   ```
   !promote FriendUsername builder
   ```

2. **Check who has what role**:
   ```
   !role list
   ```

3. **Give someone admin access**:
   ```
   !promote TrustedFriend admin
   ```

## 🤖 AI Caretakers (Phase 2)

The AI caretaker system is currently in development. You can:

1. **Check status**:
   ```
   !ai status
   ```

2. **Toggle on/off**:
   ```
   !ai toggle
   ```

3. **View current configuration**:
   ```
   !config show
   ```

## 🐛 Troubleshooting

### Addon Not Loading

**Problem**: No message appears when joining the world
**Solutions**:
- Check that both behavior and resource packs are enabled
- Verify "Activate Cheats" is enabled in world settings
- Try restarting Minecraft
- Check that manifest.json files have unique UUIDs

### Commands Not Working

**Problem**: Commands don't respond or show errors
**Solutions**:
- Make sure you're typing `!` before commands
- Check your role with `!role`
- Verify you have the right permissions
- Try `!help` to see available commands

### Permission Issues

**Problem**: Can't promote yourself to admin
**Solutions**:
- Make sure cheats are enabled
- Try the command exactly: `!promote YourExactUsername admin`
- Check that the addon loaded properly
- Restart the world if needed

### Cross-Platform Issues

**Nintendo Switch**:
- Use the on-screen keyboard for commands
- Make sure you're connected to the internet for addon sync

**iPad/Mobile**:
- Use a Bluetooth keyboard for easier command typing
- Ensure you have enough storage space

**PC**:
- Check Windows Defender isn't blocking files
- Run Minecraft as administrator if needed

## 📱 Platform-Specific Notes

### Nintendo Switch
- Commands work but typing is slower
- Consider setting up common commands as signs
- Friends can join and use voice chat for coordination

### iPad/Tablet
- Touch controls work fine for most features
- External keyboard recommended for admin tasks
- Great for builders who prefer touch building

### PC/Console
- Full keyboard support for easy command usage
- Best platform for development and testing
- Can easily share worlds with other platforms

## 🎉 You're Ready!

Your zoo addon should now be working! Here's what you can do next:

1. **Build your zoo** in the world
2. **Invite friends** and set their roles
3. **Configure exhibits** for different areas
4. **Plan for AI caretakers** (coming soon!)
5. **Customize settings** to match your vision

## 🆘 Need Help?

If you run into issues:

1. **Check the console** for error messages
2. **Try the troubleshooting steps** above
3. **Review the README.md** for more details
4. **Test with a fresh world** to isolate issues

Remember: This addon is designed to be kid-friendly and easy to use. Don't be afraid to experiment and have fun! 🎮 