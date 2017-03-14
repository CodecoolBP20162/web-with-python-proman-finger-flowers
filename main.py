from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/adder')
@app.route('/')
def listing():
    return render_template("index.html")

@app.route('/add', methods=['GET'])
def new_board():
    #board = request.form['title']
    return render_template("create_new.html")

@app.route('/add', methods=['POST'])
def add_new_board():
    return redirect(url_for("listing"))

if __name__ == "__main__":
    app.run(debug=True)