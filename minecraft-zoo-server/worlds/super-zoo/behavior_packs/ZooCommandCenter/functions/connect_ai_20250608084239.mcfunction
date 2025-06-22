# Auto-connect AI Bot Function
# This connects the zoo AI caretaker to the server

# Try multiple connection methods for reliability
connect localhost:8080/ws
connect 127.0.0.1:8080/ws
connect 172.19.0.11:8080/ws

# Notify players
say §a🤖 Connecting Zoo AI Caretaker...
say §e💡 AI Bot should be online in a few seconds!
say §c🔒 Password required! Type: !password <your_password>
say §e📋 Contact admin for your access password, then type !help 