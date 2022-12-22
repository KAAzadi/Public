function registerContent() {
    
    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
        <div>
            <table>
                <tr>
                    <td>Email Address</td>
                    <td><input type="text"  id="userEmail" /></td>
                    <td id="userEmailError" class="error"></td> 
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password"  id="userPassword" /></td>
                    <td id="userPasswordError" class="error"></td>
                </tr>
                <tr>
                    <td>Retype Your Password</td>
                    <td><input type="password" id="userPassword2" /></td>
                    <td id="userPassword2Error" class="error"></td>
                </tr>
                <tr>
                    <td>Image URL</td>
                    <td><input type="text" id="image" /></td>
                    <td id="imageError" class="error"></td>
                </tr>
                <tr>
                    <td>Birthday</td>
                    <td><input type="text" id="birthday" /></td>
                    <td id="birthdayError" class="error"></td> 
                </tr>
                <tr>
                    <td>Membership Fee</td>
                    <td><input type="text" id="membershipFee" /></td>
                    <td id="membershipFeeError" class="error"></td>
                </tr>
                <tr>
                    <td>User Role</td>
                    <td><input type="text" id="userRoleId" /></td>
                    <td id="userRoleIdError" class="error"></td>
                </tr>
                <tr>
                    <td><button onclick="insertUser()">Register</button></td>
                    <td id="recordError" class="error"></td>
                    <td></td>
                </tr>
            </table>
        </div>
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;    
}

