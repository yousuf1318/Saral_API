const express = require("express");
const app = express();
const fs = require("fs")
app.use(express.json())

app.get("/maincourse", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"))
    var arr = []
    for (var i of data) {
        var obj = {
            "id": i.id,
            "name": i.name,
            "description": i.description
        }
        arr.push(obj)

    }
    res.send(arr)
});


app.get("/one_maincourse/:id", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    var id = req.params.id
    var one_course = data[id - 1]
    delete one_course["Exercisess"]
    res.send(one_course);
})

app.post("/new_course", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    var new_course = req.body
    var id = data.length + 1
    console.log(data);

    var obj = {
        "id": id,
        "name": new_course.name,
        "description": new_course.description,
        "Exercises": []
    }
    data.push(obj)
    res.send(data)
    fs.writeFileSync("saral.json", JSON.stringify(data, null, 4))
})

app.put("/update/:id", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    for (var i of data) {
        if (i.id == req.params.id) {
            var index = data.indexOf(i)
            var Exercises = i.Exercises
            var dic = {
                "id": req.params.id,
                "name": req.body.name,
                "description": req.body.description,
                "Exercises": Exercises
            }
        }
    }
    data[index] = dic
    fs.writeFileSync("saral.json", JSON.stringify(data, null, 4))
    res.send(data)
});

app.delete("/delete_maincourse/:id", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    for (var i of data) {
        var index = data.indexOf(i)
        if (index + 1 == req.params.id) {
            var a = data.splice(index, 1)

        }
    }
    fs.writeFileSync("saral.json", JSON.stringify(data, null, 4))
    res.send(data)
})

app.get("/all_Exercisess", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    var arr = []
    for (var i of data) {

        var Exercisess = (i.Exercises)
        // console.log(Exercisess);

        for (var j of Exercisess) {
            arr.push({
                "id": j.id,
                "course": j.courseid,
                "name": j.name,
                "description": j.description,
            })

        }
    }
    res.send(arr)
})
app.get("/one_Exercisess/:id", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    var id = req.params.id
    var arr = []
    for (var i of data) {
        var Exercisess = i.Exercises
        for (var j of Exercisess) {
            if (id == j.id) {
                delete j["usersummision"]
                arr.push(j)
            }
        }
    }
    res.send(arr)
})
app.get("/one_Exercisess/:id/:id2", (req, res) => {
    var id = req.params.id
    var id2 = req.params.id2
    var data = JSON.parse(fs.readFileSync("saral.json"));
    var arr = []
    for (var i of data) {
        var Exercisess = i.Exercises
        for (var j of Exercisess) {
            if (j.id == id & j.courseid == id2) {
                delete j["usersummision"]
                arr.push(j)
            }
        }
    }
    res.send(arr)
});

app.post("/new_Exercises/:id", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    // console.log(data) 
    for (var i of data) {
        if (i.id == req.params.id) {
            var index = i
            var len = i.Exercises.length + 1
            var obj = {
                "id": i.id,
                "courseid": len,
                "name": req.body.name,
                "description": req.body.description,
                "usersubmmision": []
            }

            var Exercises_index = data.indexOf(index)
            data[Exercises_index]["Exercises"].push(obj)
            fs.writeFileSync("saral.json", JSON.stringify(data, null, 4))
        }
    }
    res.send(data)
});

app.put("/updete_exercises/:id/courseid/:id1", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    for (var i of data) {
        if (i.id == req.params.id) {
            var index = data.indexOf(i)
            for (var j of i.Exercises) {
                if (j.courseid == req.params.id1) {
                    var exe_index = i.Exercises.indexOf(j)
                    var dic = {
                        "id": i.id,
                        "courseid": exe_index + 1,
                        "name": req.body.name,
                        "description": req.body.description,
                        "usersummision": j.usersummision
                    }


                }
            }
        }
    }
    data[index]["Exercises"][exe_index] = dic
    fs.writeFileSync("saral.json", JSON.stringify(data, null, 4))
    res.send(data)
});

app.delete("/delete_maincourse/:id/Execrises/:id1", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    for (var i of data) {
        if (i.id == req.params.id) {
            var ind = data.indexOf(i)
            for (var j of i.Exercises) {
                var index = i.Exercises.indexOf(j)
                var index1 = index + 1
                if (index1 == req.params.id1) {
                    console.log(data[ind]["Exercises"].splice(index, 1))

                }

            }
        }
    }
    fs.writeFileSync("saral.json", JSON.stringify(data, null, 4))
    res.send(data)
});


app.get("/all_usersummision", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    var arr = []
    for (var i of data) {
        for (var j of i.Exercises) {
            arr.push(j.usersummision)
        }
    }
    res.send(arr)
})
app.get("/one_usresummision/:id", (req, res) => {
    var id = req.params.id
    var data = JSON.parse(fs.readFileSync("saral.json"));
    var arr = []
    for (var i of data) {
        for (j of i.Exercises) {
            for (a of j.usersummision) {
                if (a.id == id) {
                    arr.push(a)
                }

            }

        }
    }
    res.send(arr)
})

app.get("/usersubmmision/:id/:id2", (req, res) => {
    var id = req.params.id
    var id2 = req.params.id2
    var data = JSON.parse(fs.readFileSync("saral.json"));
    var arr = []
    for (var i of data) {
        for (var j of i.Exercises) {
            if (j.id == id) {
                for (var a of j.usersummision) {
                    if (a.courseid == id2) {
                        arr.push(a)
                    }
                }
            }

        }
    }
    res.send(arr)
})

app.post("/usersummision/:id", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    for (var i of data) {

        if (i.id == req.params.id) {
            var index = data.indexOf(i)
            for (var j of i.Exercises) {
                if (j.id == req.params.id) {
                    console.log(j.id)
                    var exe_index = i.Exercises.indexOf(j)
                    var len = j.usersummision.length + 1
                    var obj = {
                        "id": j.id,
                        "courseid": len,
                        "username": req.body.username,
                        "user_comment": req.body.user_comment
                    }
                }
            }
        }
    }
    data[index]["Exercises"][exe_index]["usersummision"].push(obj)
    fs.writeFileSync("saral.json", JSON.stringify(data, null, 4))
    res.send(data)
});
app.put("/update_comment/:id/courseid/:id1/summision_index/:id2", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    for (var i of data) {
        if (i.id == req.params.id) {
            var index = data.indexOf(i)
            for (var j of i.Exercises) {
                if (j.courseid == req.params.id1) {
                    var exe_index = i.Exercises.indexOf(j)
                    for (var a of j.usersummision) {
                        var ind = (j.usersummision.indexOf(a));
                        var sum_index = (ind + 1);
                        if (sum_index == req.params.id2) {
                            var summ_index = j.usersummision.indexOf(a)
                            console.log(summ_index)
                            var obj = {
                                "id": i.id,
                                "courseid": exe_index + 1,
                                "username": req.body.name,
                                "user_comment": req.body.user_comment


                            }
                        }
                    }
                }
            }
        }
    }
    data[index]["Exercises"][exe_index]["usersummision"][summ_index] = obj
    fs.writeFileSync("saral.json", JSON.stringify(data, null, 4))
    res.send(data)
});
app.delete("/delete/:id/execrises/:id1/comment/:id2", (req, res) => {
    var data = JSON.parse(fs.readFileSync("saral.json"));
    for (var i of data) {
        if (i.id == req.params.id) {
            var index_mian = data.indexOf(i)
            for (var j of i.Exercises) {
                if (j.courseid == req.params.id1) {
                    var index_exe = i.Exercises.indexOf(j)
                    for (var l of j.usersummision) {
                        var user_index = j.usersummision.indexOf(l)
                        if (user_index + 1 == req.params.id2) {
                            data[index_mian]["Exercises"][index_exe]["usersummision"].splice(user_index, 1)
                        }`      `
                    }

                }

            }

        }
    }
    fs.writeFileSync("saral.json", JSON.stringify(data, null, 4))
    res.send(data)
})


var port = 3001;
app.listen(port, () => {
    console.log("create", port);

})