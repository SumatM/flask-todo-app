from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def readTodoList():
    file = open("./database/db.json", "r")
    data = json.load(file)
    return data


todos = [{"task": "learn Flask", "status": False, "id": 1}]


def getId():
    id = todos[len(todos) - 1]["id"]
    return id + 1


def getIndex(id):
    for i in range(len(todos)):
        if todos[i]["id"] == id:
            return i
    return None


@app.route("/")  # read
def index():
    return jsonify(todos)


@app.route("/", methods=["POST"])
def createTodo():
    todo_data = request.get_json()
    print(todo_data)
    id = getId()
    todo_data["id"] = id
    todos.append(todo_data)
    return jsonify(todos)

@app.route('/todo/<int:id>')
def singleTodo(id):
    try:
        mytodo = {}
        for ele in todos:
            if(ele['id']==id):
             mytodo = ele
        return jsonify(mytodo)
    except all as e:
        return e



@app.route("/<int:id>", methods=["PATCH"])  # update
def updateTodo(id):
    try:
        todo = request.get_json()
        print(todo, id)
        todo["id"] = id
        index = getIndex(id)

        if index is not None:
            todos[index] = todo
            return todos
        else:
            return {"message": "Invalid Id"}

    except Exception as e:
        return f"Error as {e}"


@app.route("/<int:id>", methods=["DELETE"])  # delete
def deleteTodo(id):
    index = getIndex(id)
    todos.pop(index)
    return todos


if __name__ == "__main__":
    app.run(debug=True, port=8080)
