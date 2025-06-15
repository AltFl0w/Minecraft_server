# 🦁 Minecraft Zoo Addon

An interactive zoo addon for Minecraft Bedrock Edition with AI caretakers, permission system, and easy configuration.

## ✨ Features

- **🔐 Permission System**: Admin, Builder, and Visitor roles with different capabilities
- **🤖 AI Caretakers**: Automated NPCs that clean, feed animals, and maintain the zoo (Phase 2)
- **⚙️ Config-Driven**: Easy customization without coding
- **🏗️ Builder-Friendly**: Your kid and friends can easily build and add mods
- **📱 Cross-Platform**: Works on Nintendo Switch, iPad, PC, and all Bedrock platforms

## 🚀 Quick Start

### Installation

1. **Copy the addon files** to your Minecraft world:
   - Copy `packs/behavior_pack/` to `[World]/behavior_packs/`
   - Copy `packs/resource_pack/` to `[World]/resource_packs/`

2. **Enable the addon** in your world settings:
   - Go to World Settings → Behavior Packs → Add the Zoo Addon
   - Go to World Settings → Resource Packs → Add the Zoo Addon

3. **Set yourself as admin** (first time only):
   - Join the world
   - Type: `!promote YourUsername admin`

### Development Setup

```bash
# Install dependencies
npm install

# Build the addon
npm run build

# Watch for changes during development
npm run dev

# Package for distribution
npm run package
```

## 🎮 Commands

### Everyone
- `!help` - Show available commands
- `!role` - Show your current role
- `!zoo info` - Show zoo information

### Builders
- `!exhibit list` - List all exhibits

### Admins
- `!promote <player> <role>` - Change player role (visitor/builder/admin)
- `!role list` - List all player roles
- `!config show` - Show current configuration
- `!config zoo name <name>` - Set zoo name
- `!config welcome <message>` - Set welcome message
- `!ai toggle` - Toggle AI caretakers
- `!ai status` - Show AI caretaker status
- `!exhibit add <name> <animals>` - Add new exhibit
- `!exhibit remove <name>` - Remove exhibit

## 🔧 Configuration

The addon is highly configurable through in-game commands or by editing the config files:

### Zoo Settings
```typescript
{
  "general": {
    "zooName": "Amazing Zoo World",
    "welcomeMessage": "Welcome to our amazing zoo!",
    "maxVisitors": 50,
    "openingHours": { "start": 8, "end": 18 }
  }
}
```

### Permission System
```typescript
{
  "permissions": {
    "defaultRole": "visitor",
    "allowSelfPromotion": false,
    "builderCanPromoteVisitors": false
  }
}
```

### AI Caretakers (Phase 2)
```typescript
{
  "aiCaretakers": {
    "enabled": true,
    "cleaningInterval": 1200,  // 60 seconds
    "feedingInterval": 2400,   // 120 seconds
    "maxWorkDistance": 32,
    "workSpeed": 1.0
  }
}
```

## 🏗️ Project Structure

```
New_Minecraft/
├── minecraft-zoo-addon/         # Add-on development (this folder)
│   ├── packs/                   # Behavior/resource packs
│   ├── src/                     # TypeScript source code
│   ├── package.json, tsconfig.json, etc.
│   └── README.md
├── minecraft-zoo-server/        # Dockerized Bedrock server
│   ├── coolify-zoo-server.yml   # Docker Compose for Coolify
│   ├── server.properties, worlds/, etc.
│   └── README.md
└── .gitignore, etc.
```

- See [`../minecraft-zoo-server/README.md`](../minecraft-zoo-server/README.md) for server deployment and Docker instructions.

## 🤖 AI Caretakers (Coming Soon!)

The AI caretaker system is designed with placeholders for future development. Here are the questions we need to answer:

### Cleaning Tasks
- How do we detect "dirty" areas that need cleaning?
- Should we clean based on time or conditions?
- What blocks/items constitute "mess"?

### Feeding Tasks
- How do we detect hungry animals?
- What animals need what type of food?
- How often should each animal type be fed?
- Where do caretakers get food from?

### Maintenance Tasks
- What structures need maintenance?
- How do we detect broken fences, gates, etc?
- Should caretakers repair or just report issues?
- What tools do caretakers need for maintenance?

### Behavior System
- How do caretakers move to task locations?
- What animations/effects should play during tasks?
- How long should each task take?
- What happens when a task is completed?

## 🎯 Permission Roles

### Visitor
- ❌ Cannot build or destroy
- ❌ Cannot use TNT
- ✅ Can explore and enjoy the zoo

### Builder
- ✅ Can build anywhere
- ❌ Cannot destroy or use TNT
- ✅ Can view exhibits
- ❌ Cannot manage permissions

### Admin
- ✅ Full access to everything
- ✅ Can manage permissions
- ✅ Can configure AI caretakers
- ✅ Can modify zoo settings

## 🔄 Development Workflow

1. **Edit TypeScript files** in `src/`
2. **Run `npm run build`** to compile to JavaScript
3. **Test in Minecraft** by reloading the world
4. **Use `npm run dev`** for automatic rebuilding during development

## 📦 Adding New Features

The addon is designed to be modular and extensible:

1. **Add new systems** in `src/systems/`
2. **Register commands** in `CommandHandler.ts`
3. **Update configuration** in `ConfigManager.ts`
4. **Import in `main.ts`** to activate

## 🐛 Troubleshooting

### Common Issues

**Addon not loading:**
- Check that both behavior and resource packs are enabled
- Verify manifest.json UUIDs are unique
- Check console for error messages

**Commands not working:**
- Ensure you have the correct permissions
- Check command syntax with `!help`
- Verify the addon is properly loaded

**TypeScript compilation errors:**
- Run `npm install` to ensure dependencies are installed
- Check for syntax errors in your TypeScript files
- Verify import paths are correct

## 🤝 Contributing

This addon is designed to be easily modified and extended:

1. **Fork the project**
2. **Make your changes** in TypeScript
3. **Test thoroughly** in Minecraft
4. **Share your improvements** with the community

## 📝 License

MIT License - Feel free to modify and share!

## 🎉 Credits

Built with love for kids who want to create amazing zoo experiences in Minecraft! 

Special thanks to:
- Microsoft for the Minecraft Scripting API
- The Bedrock addon development community
- All the young builders who inspire us to create better tools 

## 📦 Rebuilding and Packaging the Addon

After making changes to the add-on code:

1. Go to the `minecraft-zoo-addon/` directory
2. Run:
   ```bash
   npm run build
   npm run package
   ```
3. This will update the compiled files and the `zoo-addon.mcpack` package for installation or server upload 