if __name__ == "__main__":
    from flask_server import app

    app.run(host="0.0.0.0", port=8000, debug=False)
    print(__file__)
