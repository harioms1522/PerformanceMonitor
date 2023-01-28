# Performance Monitor

# Dependencies:

NODE CLIENT:

1.  farmhash
2.  socket.io -- client

NODE SERVER:

1.  farmhash
2.  socket.io
3.  socket.io-redis

# Process

> Node clients will run on the systems and then connect to socket.io servers. Socket io servers will process the info and provide this info to the react client using romms so that the data can be rendered

# Problem is with the Scaling

> We will be using cluster module to scale our servers but the problem with this is that each and every process spun by the master process has its own scope and variabales and data are not shared between server processes
> 
> In case there is a problem with the socket connection with the node client we need some way to get to the same server again

# **NODE CLIENTS:**

**os module gives us almost all the details but the load**

# Load on cpu

os.cpus() gives us an array of the cores details and there is this property called times that give the avg time the core has spent in each mode we will average out the total time for the cores and then to calculate load at a creatin point of time 

We will calculate the time avg after 100 ms and then calculate the hike there
