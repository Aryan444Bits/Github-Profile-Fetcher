let searchbtn = document.querySelector('.search');
let usernameinp = document.querySelector('.usernameinp');
let card = document.querySelector('.card')


function getprofiledata(username){
    return fetch(`https://api.github.com/users/${username}`).then(raw => {
        if(!raw.ok) throw new Error("User Not Found !@#@..");
        return raw.json();
    })
}

function getrepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw => {
        if(!raw.ok) throw new Error("Failed to Fetch the Repos.....");
        return raw.json();
    })
}

function decorateProfileData(details){
    console.log(details);
    
    let data = `<img 
      src="${details.avatar_url}" 
      alt="GitHub Avatar" 
      class="w-24 h-24 rounded-full border-4 border-blue-500"
    />
    <div class="flex-1">
      <h2 class="text-2xl font-semibold">${details.name}</h2>
      <p class="text-gray-400 text-sm">@${details.login}</p>
      <p class="text-gray-400 mb-2">${details.bio ? details.bio : ""}</p>
      
      <div class="grid grid-cols-2 gap-4 text-sm text-gray-300">
        <div><span class="font-semibold text-white">Public Repos:</span> ${details.public_repos}</div>
        <div><span class="font-semibold text-white">Followers:</span> ${details.followers}</div>
        <div><span class="font-semibold text-white">Following:</span> ${details.following}</div>
        <div><span class="font-semibold text-white">Location:</span> ${details.location}</div>
        <div class="col-span-2">
          <span class="font-semibold text-white">Blog:</span> 
          <a href="#" class="text-blue-400 hover:underline">${details.blog}</a>
        </div>
      </div>
    </div>`


    card.innerHTML = data;
}



searchbtn.addEventListener("click",function(){
    let username = usernameinp.value.trim();
    if(username.length > 0){
        getprofiledata(username).then((data)=> {
            decorateProfileData(data)
        })
    }else{
        alert();
    }

});