async function signin(user) { 
    
    const PROD_URL=window.location.origin
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(user);
    const userRaw = JSON.stringify(user);

    if(Object.entries(user).length == 0) throw new Error('User is not defined')

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: userRaw,
        redirect: 'follow'
    };

    try {
        const userFetch = await fetch(`${PROD_URL}/users/signin`, requestOptions)

        const userData = await userFetch.json();

        if(!userData.ok) {
            mostrarErroresComoAlertasConRetraso(userData.error);
            return;
        }

        delete userData.ok;
        Storage.setData('auth', userData);
        location.href = '/album.html'
    } catch (error) {
        throw new Error(error);
    }
}