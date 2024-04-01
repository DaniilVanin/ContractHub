import os

current_file_path = os.path.abspath(__file__)

current_directory = os.path.dirname(current_file_path)

parent_directory = os.path.dirname(current_directory)

env_path = os.path.join(parent_directory, ".env")
