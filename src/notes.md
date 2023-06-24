- All components must start with a capital letter to be able to type as `<ComponentName />`

- catch exceptions close to the user interaction, e.g when a button is clicked and htat method is called or something that deals with notifications. ("Exception checks in every function are redundant and ugly." https://stackoverflow.com/questions/4506369/when-and-how-should-i-use-exception-handling)



- Initial load of data from cache or db.
- When refresh is done, check if there is a change on the last message of the chat, so I would need to save the prev state temporarily and compare it with the new one.
- When a new message is received, check if the chat is open, if it is, then update the state, if not, then update the cache.
- or maybe just update the cache always and then when the chat is open, update the state from the cache.