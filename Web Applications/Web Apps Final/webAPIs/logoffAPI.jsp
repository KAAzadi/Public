<%-- 
    Document   : logoffAPI
    Created on : Oct 21, 2022, 6:40:54 PM
    Author     : kiana
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
        StringData sd = new StringData();
        session.invalidate();
        sd.errorMsg = "User is now logged off";
        Gson gson = new Gson();
        out.print(gson.toJson(sd).trim());
    %>  
