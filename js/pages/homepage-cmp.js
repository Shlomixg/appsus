export default {
  template: `
            <section class="homepage">
                <h1>Homepage</h1>
                <div class="logo-container">
                    <router-link to="/email" class="logo keep">
                        <img src="img/email.png" width="200"  alt="">
                    </router-link>
                    <router-link to="/keep" class="logo keep">
                        <img src="img/keep.png" height="200"  alt="">
                    </router-link>
                </div>
            </section>`
};
