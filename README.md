# crudy

The json/yaml crud

# libs
- nodejs >= 23
- commander https://www.npmjs.com/package/commander

# commands
## filesystem
- [X] touch
- [X] ls
- [X] rm
- [X] use ex: use users, specify the filels
 for further operations
- [ ] cd
- [ ] echo
- [X] type
- [X] cat   


## json

- [ ] get  user.name
- [ ] put user.name = "bob"
- [ ] update user.name="alice"


# jq

```
# fichiers dans /examples # example : obtenir les clés


~/crudy/data$ jq ". | keys[]" cpanel.json 
"cpanelresult"


~/crudy/data$ jq ".cpanelresult | keys[]" cpanel.json 
"apiversion"
"data"
"event"
"func"
"module"
"postevent"
"preevent"


 jq ".cpanelresult.apiversion" cpanel.json 
 jq ".cpanelresult.postevent" cpanel.json 
 jq ".cpanelresult.postevent.result=4" cpanel.json 

```

sudo ln -s /bin/jq /home/user/dev/crudy/node_modules/node-jq/bin/jq


- https://www.npmjs.com/package/@jq-tools/jq
- https://www.npmjs.com/package/node-jq
- ? pas de source https://www.npmjs.com/package/@elastic/micro-jq
- https://www.npmjs.com/package/@port-labs/jq-node-bindings install node-gyp

- a voir https://lisperator.net/pltut/