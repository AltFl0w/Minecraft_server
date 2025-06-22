import {system, world } from "@minecraft/server";


const Checks = [
  {
    ThisFace: "east",
    
    Direction: { x: 1, y: 0, z: 0 },
    Direction1: { x: -1, y: 0, z: 0 }
  },
  {
    ThisFace: "west",
    
    Direction: { x: -1, y: 0, z: 0 },
    Direction1: { x: 1, y: 0, z: 0 }
  },
  {
    ThisFace: "north",
    
    Direction: { x: 0, y: 0, z: -1 },
    Direction1: { x: 0, y: 0, z: 1 }
  },
  {
    ThisFace: "south",
    
    Direction: { x: 0, y: 0, z: 1 },
    Direction1: { x: 0, y: 0, z: -1 }
  }
]


function vector3(sX, sY, sZ, eX, eY, eZ) {
  return { x: sX + eX, y: sY + eY, z: sZ + eZ }
}
world.beforeEvents.playerBreakBlock.subscribe((eventData) => {
    const { player, block } = eventData;
    
    let {x,y,z} = block.location
    
    if(block.typeId == "um:chest_coupler"){
      let entities = block.dimension.getEntitiesAtBlockLocation(block.location)
      let slot_entity = entities.find(e => e.typeId == "um:chest_coupler")
      if(!slot_entity) return
      
      let inv = slot_entity.getComponent("inventory").container
      let items = []
      let i = 0
      while(i < inv.size){
      let slot = inv.getSlot(i)
      let item = slot?.getItem()
      if(!item) return
      items.push(item)
      i++
      }
      system.runTimeout(() => {
        for(let item of items){
      block.dimension.spawnItem(item, block.location)
        }
      },1)
    }
    
    })

world.beforeEvents.worldInitialize.subscribe(event => {

  event.blockComponentRegistry.registerCustomComponent("um:chest_coupler", {
    // onTick: (event) => {  
//      updatePipe(event)
//       itemTrasport(event)
//     },
    onPlace: (event) => {
            const { block, dimension, previousBlock } = event;
            let {x,y,z} = block.location
    let chest_coupler = dimension.spawnEntity("um:chest_coupler", {x: x+0.5,y: y+0.5,z: z+0.5})
    chest_coupler.nameTag = "um.item.pipe"
        }
    

  })
})

system.runInterval(() => {
  for (const dimension of ["overworld", "nether", "the_end"]) {
    const dim = world.getDimension(`minecraft:${dimension}`);

    const chest_coupler = dim.getEntities({ type: "um:chest_coupler" }); 
    for(let e of chest_coupler){
      let pos = e.location
  let dimension = e.dimension
  let loc = {x: Math.floor(pos.x),y: Math.floor(pos.y),z: Math.floor(pos.z)}
  let block = dimension.getBlock(loc)
      updatePipe(block, dimension);
      itemTrasport(block, dimension, e);
  
    }
  }
}, 20);

function updatePipe(block, dimension) {


  let thisStates = block.permutation.getState("um:pipe");
  let blockFace =
     block.permutation.getState("minecraft:cardinal_direction")
    

  Checks.forEach(check => {
    if(check.ThisFace == blockFace){
      let otherBlock = block.dimension.getBlock(vector3(block.location.x, block.location.y, block.location.z, check.Direction.x, check.Direction.y, check.Direction.z));

    if (otherBlock.typeId == "um:item_pipe") {
      block.setPermutation(block.permutation.withState("um:pipe", true));
    }
    else {
      block.setPermutation(block.permutation.withState("um:pipe", false));
    }
    }
    

  })
}




function itemTrasport(block, dimension, entity){
  let {x,y,z} = block.location
  let filtorInv = entity.getComponent("inventory").container
  let blockFace = block.permutation.getState("minecraft:cardinal_direction")
  
  Checks.forEach(loc => {
    if(blockFace == loc.ThisFace){
      let sourchBlock =
      dimension.getBlock(vector3(block.location.x,block.location.y,block.location.z,loc.Direction1.x,loc.Direction1.y,loc.Direction1.z))
      
      let startpos = vector3(block.location.x,block.location.y,block.location.z,loc.Direction.x,loc.Direction.y,loc.Direction.z)
      
      let item;
          
     // if(sourchBlock.typeId == "minecraft:chest"){
        let inv = sourchBlock.getComponent("inventory")?.container
        if(inv){
        
        
        
        const queue = [startpos];
  const visited = new Set();
  let chest;

  const offsets = [
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: -1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: -1 },
  ];

  while (queue.length > 0) {
    const pos = queue.shift();
    const key = `${pos.x},${pos.y},${pos.z}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const block = dimension.getBlock(pos);

    if (block?.typeId == "um:item_pipe") {
    

      for (const offset of offsets) {
        queue.push({
          x: pos.x + offset.x,
          y: pos.y + offset.y,
          z: pos.z + offset.z,
        });
      }
      continue;
    }
    //if (block?.typeId == "minecraft:chest" && !chest) {}
      let inv = block.getComponent("inventory")?.container
      if(inv && !chest){
      if(inv.emptySlotsCount >=1)
      chest = block
      }
      


  }
  if(!chest) return;
  let invS = sourchBlock.getComponent("inventory")?.container
  let filtorSlot = 0
  let filtorItems = [
    ]
        while(filtorSlot < filtorInv?.size){
          let filtorItem = filtorInv?.getSlot(filtorSlot)
          if(filtorItem.hasItem()){
            filtorItems.push(filtorItem.typeId)
          }
          filtorSlot++
        }
        
        let i = 0
        while(i < invS.size){
          
          let slotItem = invS.getSlot(i)
          if(slotItem.hasItem() && !item){
            if(filtorItems != 0){
              for(let filtorI of filtorItems){
                if(filtorI == slotItem?.typeId){
            item =slotItem.getItem()
            slotItem.setItem()
            break
            } 
              }
            }
            else if(filtorItems.length == 0){
               item =slotItem.getItem()
            slotItem.setItem()
            break
            }
             
            

            
          }
          i++
        }
        
        if(!item) return
        
  if (chest) {
    let inv = chest.getComponent("inventory")?.container
    if(item){
      inv.addItem(item)
    }
  }
  
      }
      
    }
  
  
  })
}