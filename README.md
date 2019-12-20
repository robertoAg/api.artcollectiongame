**Endpoints**

npm run start:dev

*/api/artist*
*POST*

Example:

Info example for proxy reverse /api

RequestHeader set "x-forwarded-proto" "https"
DocumentRoot "/home/msolutions4/html/gogameplus.mobi/public"
ServerName gogameplus.mobi
ServerAdmin webmaster@localhost
RewriteEngine On
RewriteCond %{HTTP} !=on
RewriteCond "%{REQUEST_URI}" "/pagosvodafone.*"
RewriteRule ^/?(.*) http://%{SERVER_NAME}/$1 [R,L]
ErrorLog /var/log/apache2/error.log
CustomLog /var/log/apache2/access.log combined
Alias /fixed_con "/home/msolutions3/html/fixed_con"
<Directory "/home/msolutions4/html/fixed_con">
Require all granted
Options -Indexes
Allowoverride All
</Directory>
<Directory "/home/msolutions4/html/gogameplus.mobi/public">
Require all granted
Options -Indexes
Allowoverride All
</Directory>
ProxyRequests Off
ProxyPreserveHost On
ProxyPass /pagosvodafone/ http://10.10.41.46:8090/
ProxyPassReverse /pagosvodafone/ http://10.10.41.46:8090/
ProxyPass /orange/ http://10.10.41.46:9018/
ProxyPassReverse /orange/ http://10.10.41.46:9018/
ProxyPass /yoigo/ http://10.10.41.46:8095/
ProxyPassReverse /yoigo/ http://10.10.41.46:8095/
Include /etc/letsencrypt/options-ssl-apache.conf
BalancerPersist On
<Location "/balancer-manager">
    SetHandler balancer-manager
  Order allow,deny
        allow from 85.62.29.128
           # Require ip 85.62.29.128
</Location>
 SSLCertificateFile /etc/letsencrypt/live/gogameplus.mobi/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/gogameplus.mobi/privkey.pem