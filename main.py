import eel
from access_client_master import (
    parse_client_master_excel_file_and_return_dict,
    generate_list_from_client_master_dict,
)
from login_on_gst_portal import login_on_GSTPortal

with open(r"db\db_path.txt", "r") as file:
    excel_file = file.read()

eel.init("web")

# Excel processing and giving clients' sorted list and dict containing corresponding details
@eel.expose
def get_client_list_and_dict_from_excel():
    client_dict = parse_client_master_excel_file_and_return_dict(excel_file)
    client_list = generate_list_from_client_master_dict(client_dict)
    return [client_list, client_dict]


@eel.expose
def eel_login_on_gst_portal(id, pwd):
    login_on_GSTPortal(id, pwd)


eel.start("main.html")

