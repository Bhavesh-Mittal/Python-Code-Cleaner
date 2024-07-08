from flask import Flask, request, jsonify
from flask_cors import CORS
import re, autoflake, isort, black, logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level = logging.INFO)

def formatCode(code):
    try:
        code = autoflake.fix_code(code, remove_all_unused_imports = True)
        code = isort.code(code)
        code = black.format_str(code, mode = black.FileMode())
    except Exception as e:
        logging.error(f'Error formatting code : {e}')
        raise e
    return code

def convertToCamelCase(code):
    def camelCaseReplacer(match):
        words = match.group(0).split('_')
        return words[0] + ''.join([word.capitalize() for word in words[1:]])

    pattern = re.compile(r'\b[a-z]+(?:_[a-z]+)+\b')
    return pattern.sub(camelCaseReplacer, code)

@app.route('/clean', methods = ['POST'])
def cleanCode():
    data = request.json
    if 'code' not in data or not isinstance(data['code'], str):
        return jsonify({'error' : 'Invalid input'}), 400

    code = data['code']

    try:
        code = formatCode(code)
        code = convertToCamelCase(code)
    except Exception as e:
        logging.error(f'Error cleaning code : {e}')
        return jsonify({'error' : str(e)}), 500
    
    return jsonify({'cleanCode' : code})

if __name__ == '__main__':
    app.run()