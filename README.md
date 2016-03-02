Anna Sokolova
Gossip Protocols Part 1

1.	This lab uses a vector clock algorithm to create unique message IDs based on a sequence number. Could we replace the sequence number with a timestamp?
If it’s a full timestamp (with day, year, etc.), we can, because the whole reason behind the sequence number is that every number should be unique and numbers must be assigned in increasing order. Timestamp naturally has these characteristics.  
2.	What are the advantages and disadvantages of such an approach?
Advantages of having a sequence number are the size (we only need one number, whereas a timestamp is always long and harder to process) and uniqueness (even though it is unlikely that two sequence numbers will be issues at the same second, that might happen, whereas if we store the counter variable we can isolate it so that only one process at a time can access it and that will ensure uniqueness).  
Disadvantage of having a sequence number is the necessity to store the counter variable. This adds some complexity, since all processes have to coordinate and isolation of this variable needs to be implemented. This might also slightly slow down the program, since only one process at a time can access the counter and if there are many processes, some of them might time out or return with a delay. Having a timestamp makes the processes completely independent and doesn’t require storing any data.
3.	Are the chat messages in order? Why or why not? If not, what could you do to fix this?
They are not, but messages from the same origin are in order. For all messages to be ordered we could have a common counter (that generates sequence numbers) for all nodes or use timestamps instead of sequence numbers.
4.	How did you avoid looping (sending messages back to someone who already has it)? Why was the unique ID helpful?
My propagate algorithm first sends the want request and checks if the peer already has this rumor. If it does, the algorithm moves onto next peer.  Since all rumors have unique IDs, it is possible to check if this rumor was already received and stop propagating it.
5.	Why would a UUID be better than a long random number for creating the origin ID?
I think, there is just a better chance of achieving uniqueness and avoiding collisions since UUID libraries are designed to ensure that. Whereas with a random number collisions are unlikely but possible, especially if the same library is used.
6.	The propagation algorithm sleeps for n seconds between each iteration. What are the trade-offs between a low and high value for n.
With the low value the rumors get propagated fast, but 

Source code: in this repository 

For simplicity of creating many nodes, I set the request with the “create” query to create a new node by default and randomly assign it the random amount of peers from already existing nodes. After that, I could start a node from the browser, used the script to create n more nodes, and lastly started another node or two from the browser. After that, I created a rumor from one browser window and saw of it showed up in other browser windows I have. Node collection is just an array of node id – list of peers pairs.

