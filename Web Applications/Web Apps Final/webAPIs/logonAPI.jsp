<%-- 
    Document   : logonAPI
    Created on : Oct 21, 2022, 4:12:34 PM
    Author     : kiana
--%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

   <%
        StringData sd = new StringData();
        String email = request.getParameter("userEmail");
        String password = request.getParameter("password");
        System.out.print(email);
        if ((email == null) || (password == null)) {
            sd.errorMsg = "Cannot search for user: 'userEmail' and 'password' must be supplied";
        } else {
            DbConn dbc = new DbConn();
            sd.errorMsg = dbc.getErr(); 
            if (sd.errorMsg.length() == 0) { 
                System.out.println("*** Ready to call newFind");
                sd = DbMods.UserFind(dbc, email, password);  
            }
            dbc.close(); 
            
            if (sd.errorMsg.equals("")){
                session.setAttribute("loggedOnUser",sd);
            }
            else{
                session.invalidate();
            }
        }
        Gson gson = new Gson();
        out.print(gson.toJson(sd).trim());
    %>   
