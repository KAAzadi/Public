<%-- 
    Document   : getProfileAPI
    Created on : Oct 21, 2022, 6:04:00 PM
    Author     : kiana
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
        StringData sd = new StringData();
        if(session.getAttribute("loggedOnUser") != null){
            sd = (StringData)session.getAttribute("loggedOnUser");
        }
        Gson gson = new Gson();
        out.print(gson.toJson(sd).trim());
    %>  