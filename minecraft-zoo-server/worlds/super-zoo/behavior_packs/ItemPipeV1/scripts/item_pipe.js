import { BlockPermutation, system, world } from "@minecraft/server";

 
const Checks = [
  {
    ThisFace: "um:top",
    OtherFace: "um:bottom",
    Direction: { x: 0, y: 1, z: 0 }
  },
  {
    ThisFace: "um:bottom",
    OtherFace: "um:top",
    Direction: { x: 0, y: -1, z: 0 }
  },
  {
    ThisFace: "um:east",
    OtherFace: "um:west",
    Direction: { x: -1, y: 0, z: 0 }
  },
  {
    ThisFace: "um:west",
    OtherFace: "um:east",
    Direction: { x: 1, y: 0, z: 0 }
  },
  {
    ThisFace: "um:north",
    OtherFace: "um:south",
    Direction: { x: 0, y: 0, z: -1 }
  },
  {
    ThisFace: "um:south",
    OtherFace: "um:north",
    Direction: { x: 0, y: 0, z: 1 }
  }
]


function vector3(sX, sY, sZ, eX, eY, eZ) {
  return { x: sX + eX, y: sY + eY, z: sZ + eZ }
}


world.beforeEvents.worldInitialize.subscribe(event => {
  event.blockComponentRegistry.registerCustomComponent("um:item_pipe", {
    onTick: (event) => {
      updatePipe(event)

    }


  })
})


function updatePipe(event) {
  const { block, dimension } = event;


  let thisStates = block.permutation.getAllStates();

  Checks.forEach(check => {
    let otherBlock = block.dimension.getBlock(vector3(block.location.x, block.location.y, block.location.z, check.Direction.x, check.Direction.y, check.Direction.z));

    if (otherBlock == undefined) {
      thisStates[check.ThisFace] = false;
    }
    else if (otherBlock.typeId != block.typeId) {
      thisStates[check.ThisFace] = false;
    }
    else {
      let otherStates = otherBlock.permutation.getAllStates();
      otherStates[check.OtherFace] = true;
      thisStates[check.ThisFace] = true;
      otherBlock?.setPermutation(BlockPermutation?.resolve(otherBlock.typeId, otherStates));
    }
    if(!otherBlock) return;
    
    if(otherBlock.typeId == "um:chest_coupler")    thisStates[check.ThisFace] = true;
    let inv = otherBlock.getComponent("inventory")?.container
if(!inv) return;
thisStates[check.ThisFace] = true;
  })

  block.setPermutation(BlockPermutation.resolve(block.typeId, thisStates));
}