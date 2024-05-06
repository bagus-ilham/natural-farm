<template>
  <div class="flex lg:space-x-12 items-center" role="navigation">
    <div class="hidden lg:w-[48%] lg:block">
      <Search />
    </div>
    <div class="w-full lg:w-[51%]">
      <div class="flex justify-between items-center">
        <div class="lg:hidden">
          <router-link to="/" class="flex justify-center items-center w-12 h-12 rounded-xl bg-gray-50">
            <img src="../../assets/8123322.jpg" class="rounded-full"></img>
          </router-link>
        </div>
        <TopNavLinks />
        <UserAvatar />
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../Search.vue";
import TopNavLinks from "./TopNavLinks.vue";
import UserAvatar from "../UserAvatar/UserAvatar.vue";

export default {
  name: "TopNav",
  components: { Search, TopNavLinks, UserAvatar },
};
</script>