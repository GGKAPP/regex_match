from flask import Flask, request, jsonify, render_template
import re

app = Flask(__name__)

FLAG = "heCTF{r3g3x_m4tch1ng_m4st3r_jisj6638knf}"

# The regex pattern users need to match
# This pattern matches strings that start with "flag" followed by specific characters
REGEX_PATTERN = r"^heCTF\{(?=.*[a-zA-Z])(?=.*\d)(?=.*_)[a-zA-Z\d_]{10,}\}$"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/check", methods=["POST"])
def check():
    data = request.json
    user_input = data.get("input", "")

    # Check if the input matches our regex pattern
    if re.match(REGEX_PATTERN, user_input):
        return jsonify({
            "success": True, 
            "flag": FLAG,
            "message": "🎉 Congratulations! You matched the regex pattern!"
        })
    else:
        return jsonify({
            "success": False, 
            "message": "❌ Your input doesn't match the required pattern. Try again!",
            "hint": "The pattern expects something that looks like a flag format..."
        })

@app.route("/pattern")
def get_pattern():
    # Endpoint to reveal the regex pattern (for debugging/hints)
    return jsonify({"pattern": REGEX_PATTERN})

if __name__ == "__main__":
    app.run(debug=True)