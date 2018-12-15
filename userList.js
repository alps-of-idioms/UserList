class UserList {
    constructor() {

    }

    getElem() {
        if (!this.elem) {
            this.render(); 
        }
        return this.elem;
    }

    render() {
        let html = _.template(`<div class='user-list'></div>`)();
        this.elem = createElementFromHtml(html);

        this.elem.addEventListener('click', this);
        this.elem.addEventListener('submit', this)
    }

    handleEvent(event) {
        this['on' + event.type[0].toUpperCase() + event.type.slice(1)](event);
    }

    onClick(event) {
        if (event.target.dataset.userId) {
            this.elem.dispatchEvent(new CustomEvent('user-select', {
                bubbles: true,
                detail: event.target.dataset.userId
            }));
            event.preventDefault();
        }
    }

    showUsers(users) {
        this.users = users;
        this.elem.innerHTML = _.template(`<ul>
    <% for(let user of users) {%>
      <li class= "list-elem"><img class="avatar-img" src="<%=user.avatarUrl%>" alt="avatar"><a href="#" class="list-anchor" data-user-id="<%=user._id%>"><%=user.fullName%></a></li>
    <% } %>
    </ul>
    `)({users});
    }

   
  
} 