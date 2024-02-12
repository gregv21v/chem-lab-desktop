# Chem-Lab
An chemical engineering game about designing the chemicals. <br>

<strong>Objective:</strong>
Create your own lab using pipes and tanks


# Getting Started 
To run the game, first install it, by running the command `npm install` in your command line. Once you've 
install the game, type `npm run dev` to run the game.




This game is in early alpha, so expect bugs

<strong> Items </strong>
- Valves                  --> Pipes that you can open and close
- Tank                    --> Stores liquid
- Pump                    --> Produces liquid
- Liquid Distributor Pipe --> Distributes liquids evenly among connecting tanks
- Liquid Sorter Pipe      --> Sorts liquids by color


<strong> Tools </strong>
- Sell Tool               --> Allows you to sell the contents of a tank


<strong> Mechanics </strong>
- A <b>shop</b> where you can buy and sell items.
- An <b>inventory</b> where you store your items.
- A <b>world</b> where you place your items.
- The ability to sort various liquids, by chemical properties
- Different chemicals that react in different ways when they are combined with each other.


<strong> TODO:</strong>
- Tanks
  - Make it so that fluids can only enter sided tanks 
      through an open side. (partly done way done)
  - make it so that pipes connected to tanks show like they are connected (partly done)
- Create the liquid distributor pipe
- Create the liquid sorter pipe 
- Create a class for the sell tank (extra)
- Create the shop interface (priority)
- Design the shop interface
- Connect pipes together
- Overflow mechanic: tanks spill drops over the edges
  when they have been filled too much. (extra)
- Display a miniturized graphic of the actual world object on the icons
  for an each item (extra)
- Display opening in tank when pipes are attached. (extra)
- Create a list of chemicals of various densities for each tank
- Create a home screen 
- Add the ability to buy and sell tanks
- Comment all the code.
- Increase Performance
- Big Changes
  - Convert to Raster Graphics for faster performance
- Create a test page
- Add touch screen capability
- Add fluid "shaders" that make lower density fluids appear more like smoke, and vis versa for denser fluids 
- Make it so that you can move game objects
- give some indication when one object is snapped to another
- Make it so that fluids enter pipes starting from the bottom, then going from left to right. The top is last.
- Fluids should entered the pipe one drop at a time, and the drops should not overlap
- When scrolling through the inventory make the items not within the inventory box hidden.


<strong>Current Issue</strong>
If you rotate a pipe two times near a tank then place that pipe it will attach to the side it was snapping to before you rotated it instead of the opposite side like its suppose to


