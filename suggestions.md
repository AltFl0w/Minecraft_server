# 🎯 **UPDATED: Zoo Addon Development Plan**

## ✅ **Current Status: Server-First Approach (CORRECTED)**

We're following the **server-first approach** using **Coolify on your Linux server** because:
- ✅ AI bots need persistent server to live 24/7
- ✅ Better debugging with server logs
- ✅ Hot reload capabilities
- ✅ Multi-device testing (Switch/iPad can connect)
- ✅ **IMPORTANT**: Runs on Linux server, not Mac (avoids Rosetta issues)

## 🚀 **Phase 1: Clean Bedrock Server Setup** *(READY TO DEPLOY)*

### **What We've Built:**
- ✅ TypeScript addon structure with permission system
- ✅ AI caretaker placeholders and framework
- ✅ Config-driven system for easy customization
- ✅ **Coolify-compatible Docker Compose** (`coolify-zoo-server.yml`)
- ✅ Ready-to-install addon package (`zoo-addon.mcpack`)
- ✅ **Complete deployment guide** (`COOLIFY_DEPLOYMENT.md`)

### **Next Steps:**
1. **Deploy to Coolify**: Follow `COOLIFY_DEPLOYMENT.md` guide
2. **Install Zoo Addon**: Copy addon files to server volumes
3. **Test Connection**: Connect from Switch/iPad/PC
4. **Verify Permissions**: Test admin/builder/visitor roles

## 🎮 **Server Details:**
- **Ports**: 19134/19135 (avoids conflicts with existing server)
- **Image**: `05jchambers/legendary-bedrock-container:latest`
- **Config**: Creative mode, peaceful, cheats enabled
- **Max Players**: 10 (configurable)

## 🤖 **Phase 2: AI Caretakers** *(DESIGN PHASE)*

### **Questions to Answer:**
1. **What animals** need care? (feeding schedules, cleaning)
2. **How often** should caretakers work? (every 5 minutes? hourly?)
3. **Visual feedback** - should players see caretakers working?
4. **Automation level** - fully automatic or player-triggered?
5. **Failure handling** - what if animals are missing/dead?

### **Technical Approach:**
- **Server-side NPCs** that persist between player sessions
- **Scheduled tasks** using Minecraft's tick system
- **Smart pathfinding** to animal enclosures
- **Visual effects** when performing tasks
- **Config-driven** behavior (easy to customize)

## 🔧 **Phase 3: Advanced Features**

### **Planned Features:**
- **Economy system** (tickets, food costs, etc.)
- **Visitor management** (guided tours, information signs)
- **Animal breeding** automation
- **Exhibit expansion** tools
- **Statistics dashboard** (visitor count, animal health, etc.)

## 📁 **File Structure:**
```
New_Minecraft/
├── 📦 zoo-addon.mcpack           # Ready-to-install addon
├── 📄 coolify-zoo-server.yml    # Coolify deployment config
├── 📄 COOLIFY_DEPLOYMENT.md     # Step-by-step deployment guide
├── 📂 src/                      # TypeScript source code
├── 📂 packs/                    # Compiled addon files
└── 📄 suggestions.md            # This file (project roadmap)
```

## 🎯 **Immediate Action Items:**

1. **YOU**: Deploy server using Coolify guide
2. **US**: Test connection and addon installation
3. **YOU**: Import your zoo world
4. **US**: Configure permissions and test with friends
5. **TOGETHER**: Design AI caretaker behavior

---

**Remember**: We're building this for your kid and friends to easily add mods and have AI caretakers. Keep it simple, configurable, and fun! 🎮

## 🎯 **Why Clean Server vs Existing:**
- **No Conflicts**: Existing server has permission systems that could conflict
- **Fresh Start**: Clean slate for our zoo-specific configurations
- **Dedicated Purpose**: Server optimized specifically for zoo operations

## 📋 **Technical Stack:**
- **Server**: Docker + Legendary Bedrock Container (proven, well-maintained)
- **Addon**: TypeScript + Minecraft Script API
- **Deployment**: Coolify for easy management
- **Development**: Hot reload with `npm run watch`

## 🎮 **Commands Available:**
- `!help` - Show available commands
- `!role` - Check your current role
- `!promote <player> <role>` - Promote players (admin only)
- `!config <setting> <value>` - Modify settings (admin only)
- `!ai <command>` - Control AI caretakers (admin only)

## 📁 **Project Structure:**
```
New_Minecraft/
├── 📦 zoo-addon.mcpack          # Ready-to-install addon
├── 📂 src/                      # TypeScript source
├── 📂 packs/                    # Compiled addon files
├── 🐳 docker-compose.zoo.yml    # Clean server setup
├── 📚 README.md                 # Documentation
└── 📋 SETUP_GUIDE.md            # Step-by-step guide
```

## 🎯 **Immediate Next Action:**
Deploy the clean server and test the addon installation!

🖥️ Best Workflow for Bedrock Addon Development & Testing

1. Local Bedrock Dedicated Server (BDS)
	•	Why: Lets you instantly test and debug behavior packs/add-ons without needing to upload to your iPad or Switch every time.
	•	What: Mojang's official Bedrock Dedicated Server (BDS) runs on Windows, Linux, or even in Docker.
	•	How it helps: You just drop your world and add-on files in the right folders, start the server, and instantly see results (and error messages/logs!).

⸻

2. Coolify + Docker: Running BDS
	•	Coolify is a modern self-host platform—perfect for running containerized workloads like Minecraft servers.
	•	There are community Docker images for BDS, so you can deploy a Bedrock server to Coolify and expose it for LAN/remote testing.

Recommended Docker Images for Bedrock
	•	itzg/docker-minecraft-bedrock-server
	•	Most popular, regularly updated, great docs.
	•	Supports custom worlds, auto-backup, and easy add-on/behavior pack installation.
	•	Docker Hub page
	•	mc-bds/docker-bedrock-server
	•	Another good option, with environment variable controls.

How to use with Coolify:
	•	Add a new "Docker Compose" app in Coolify.
	•	Use the Compose or single-container settings to spin up the Bedrock server image.
	•	Mount a volume for your worlds and behavior_packs/resource_packs so you can update without rebuilding.
	•	You can SFTP or use Coolify's file manager to upload your custom behavior pack files as you iterate.

⸻

3. Debugging & Hot Reload
	•	BDS will print errors and warnings if there are problems with your packs—much easier than cryptic iPad errors!
	•	You can restart the server in seconds after making a change.
	•	Join your server from your iPad/Switch/PC to test live multiplayer behaviors.

⸻

4. Optional: Code Testing
	•	GameTest Framework: Use the GameTest scripting in your behavior packs for automated scenario testing.
	•	Bedrock Preview/Beta: You can run the Preview build of BDS to get the latest Script API support if you want bleeding-edge features.

⸻

🚀 Quick-Start Plan
	1.	Set up a Docker Bedrock server (e.g. itzg/minecraft-bedrock-server) on your Coolify instance.
	2.	Mount/Expose the folders for:
	•	/data/worlds (your actual world)
	•	/data/behavior_packs (drop your scripts here)
	•	/data/resource_packs
	3.	Develop and edit your code locally (on your laptop/desktop).
	4.	Upload changes to the server's behavior_packs folder (Coolify file manager or SFTP).
	5.	Restart the server (from Coolify or command line).
	6.	Join with Minecraft on any Bedrock device to test—fast feedback and logs.

⸻

🗂️ Repos/Tools for Addon Code Testing (Outside Minecraft App)
	•	bedrock-addon-tools: CLI tools to lint and validate your Bedrock packs before uploading.
	•	bridge.: Visual editor for Bedrock add-ons. Lets you simulate/test logic before even running Minecraft.
	•	Blockbench: 3D model editor, good for entity work.

⸻

Summary Table

Need	Solution/Repo
Run BDS server easily	itzg/docker-minecraft-bedrock-server
Deploy/host on Coolify	Add as Docker app or Compose in Coolify
Update/add test code fast	Upload to behavior_packs on the server
See errors/fix fast	Watch server logs in Coolify or via SSH
Edit/test add-ons visually	bridge., Blockbench, bedrock-addon-tools


-otherdetails-


🦁 Minecraft Bedrock Addon Framework for a Customizable Zoo World

Goal:
Make a "starter kit" for your interactive zoo using open-source code and frameworks.
You'll be able to:
	•	Add AI-powered NPCs (visitors, staff, guides)
	•	Create custom commands, interactive objects, and features
	•	Control permissions (who can do what)
	•	Easily expand or customize everything—no world limitations

⸻

1️⃣ Foundation: Blokkr or Microsoft Scripting Samples
	•	Pick your starting point:
	•	Blokkr (for project structure, easy builds, and organizing your code)
	•	minecraft-scripting-samples (official, tons of ready-made examples for scripting, AI, and more)

What to do:
	•	Use Blokkr to scaffold your project ("blok new my-zoo-addon"), or just clone the scripting-samples repo for a head start.
	•	These will give you all the folders and files you need, and lots of example code you can copy/paste or tweak.

⸻

2️⃣ Add Powerful Community Modules: JaylyDev ScriptAPI
	•	Go to JaylyDev/ScriptAPI (community-made add-ons and helpers)
	•	Find useful code for:
	•	Custom UI/menus
	•	Advanced player commands
	•	Permission systems (who's staff, who's visitor, etc.)

What to do:
	•	Copy the components or utilities you need into your project (the readme and folders explain what each does)
	•	Use these as examples or building blocks for your own features

⸻

3️⃣ AI & NPC Examples: Scripting and Tutorials
	•	Both Microsoft and JaylyDev repos have scripts for:
	•	Making NPCs walk around
	•	Making bots follow players
	•	Triggering behaviors on events (like interacting with an exhibit)
	•	You can also find simple YouTube/video tutorials like "How to Make a Working Walking AI in Minecraft Bedrock with Commands" and "NPC Followers" for step-by-step walkthroughs.

What to do:
	•	Start by copying an "AI" script—like a wandering or following NPC—and make it your own (change messages, paths, etc.)
	•	Test it in your world; expand as you learn

⸻

4️⃣ GameTest & Automated Behavior
	•	Use minecraft-gametests to add testing and automation (e.g., NPCs that perform actions on a schedule, or run checks when certain things happen)
	•	This isn't required for fun, but it's handy if you want complex or automated behaviors

⸻

5️⃣ Customize and Combine
	•	You control the world file:
Just import your zoo world into Minecraft.
	•	Add your custom behavior pack (the one you built using steps above)
	•	Mix and match code samples, modules, and AI scripts until it feels right

⸻

🏗️ Plan / Workflow
	1.	Set up your project folder using Blokkr or by cloning Microsoft's scripting-samples.
	2.	Browse through JaylyDev ScriptAPI and scripting-samples for code examples—copy in features you want.
	3.	Choose a starter AI/NPC example (from samples or community tutorials) and put it in your project.
	4.	Test: Load into Minecraft Bedrock (on your tablet, Switch, etc.) and try it out!
	5.	Expand: Add more features, tweak NPC logic, experiment with permissions.
	6.	Ask for help: If you get stuck, both repos have communities, and you can always come back here for help.

⸻

🔗 Repos to Bookmark
	•	Blokkr Bedrock Addon Framework
	•	Microsoft minecraft-scripting-samples
	•	JaylyDev ScriptAPI
	•	Microsoft minecraft-gametests

⸻

🧩 Summary Table

What You Want	Repo/Example	Why/How to Use It
Clean project structure	Blokkr, minecraft-scripting-samples	Sets up folders, manifest, scripts, etc.
NPC AI (walking, talking, etc.)	JaylyDev ScriptAPI, scripting-samples, YouTube	Copy scripts, tweak for your behaviors
Permissions (staff, visitor, etc.)	JaylyDev ScriptAPI (@minecraft/server-admin)	Check/copy role logic, adapt as needed
Extra features (menus, commands)	JaylyDev ScriptAPI, scripting-samples	Plug in ready-made modules
Testing/automation	minecraft-gametests	Build/test advanced behaviors
