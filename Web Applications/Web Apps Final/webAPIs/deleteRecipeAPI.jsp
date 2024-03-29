<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="model.saved_recipes.*" %>
<%@page language="java" import="com.google.gson.*" %>


<%

    // This is the object we get from the GSON library.
    // This object knows how to convert betweeb these two formats: 
    //    POJO (plain old java object) 
    //    JSON (JavaScript Object notation)
    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    StringData errorMsgs = new StringData();

    String id = request.getParameter("id");
    if (id == null) {
        errorMsgs.errorMsg = "Cannot insert -- URL parameter 'id' was not supplied";
        System.out.println(errorMsgs.errorMsg);
    } else {
        System.out.println("id is " + id);
        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
            System.out.println("deleteRecipeAPI.jsp ready to delete");
            
            // this method takes the user's input data as input and outputs an error message object (with same field names).
            errorMsgs.errorMsg = DbMods.delete(id, dbc); // this is the form level message
        }
    }

    out.print(gson.toJson(errorMsgs));
    dbc.close();
%>
