function getSample(user: { username: string; website: string }): string {
  return `<li class="card">
     <div class="card__user-avatar-wrapper">
       <img
         class="card__user-avatar"
         src="/images/user-avatar.svg"
         alt=""
       />
     </div>
     <p class="card__user-name">${user.username}</p>
     <p class="card__user-bio">${user.website}</p>
    </li>`;
}

export { getSample };
