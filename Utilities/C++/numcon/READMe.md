The utility tool numcon is inspired by the Sysinternals utility Hex2Dec, however instead of just converting hex and decimal values, it is able to also convert interchangably between binary and octal as well. It will be able to be used on the Windows OS, and allow users who want to make on the fly conversion do so with ease. 

<h2>Flags</h2>
-a - a unique flag that can only be present as the 2nd option. This indicates that the user will want to have the initial value converted to all number values.<br/>
-b - indicates the following value is a binary value<br/>
-d - indicates the following value is a decimal value<br/>
-h - indicates the following value is a hexadecimal value<br/>
-o - indicates the following value is an octal value<br/>

<h2>Examples</h2>
<h4>Binary to decimal</h4>
>numcon -b 1001 -d
<h4>Decimal to hexadecimal</h4>
>numcon -d 12345 -h
<h4>Decimal to all</h4>
>numcon -b 1001 -a
