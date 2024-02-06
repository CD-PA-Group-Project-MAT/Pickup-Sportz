# Pickup-Sportz

### ABOUT:
**User authentication and authorization scheme**
* Derived primarily from Dave Gray code-along https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd
* At time of registration or login, an access token is delivered in the response body along with the user. Additionally, a refresh token is returned and set in an httpOnly cookie.
* The access token and user are stored in memory in context 'auth'
* Routes are wrapped in a RequireAuth component and a PersistLogin component that check on the existence of a 'user' property within 'auth'. If that 'user' does not exist in 'auth' then, PersistLogin will attempt a refresh. If that fails, then RequireAuth will redirect the user to /Login
* When the access token expires and user either 1, attempts to navigate to a protected route or 2, has an axios request rejected because of invalid/nonexistent access token, then an attempt is made to refresh the access token.
* Any refresh attempt is made by using JWT on the back end and verifying the refresh token that is in the cookie. If verification is successful, then a new access token is sent back in the response body, 'auth' is updated, and user is uninterrupted.

### TODO:
- add axios AbortController functionality on axios requests if component unmounts https://www.youtube.com/watch?v=nI8PYZNFtac&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=4&pp=iAQB @ 10:00
- add handling for slow connection on join/drop and anywhere else it might be needed (loading spinner or optimstic sequence of events)
