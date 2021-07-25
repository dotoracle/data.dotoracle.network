<template>
    <div>
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
            <div class="container-fluid justify-content-md-center">
                <a class="navbar-brand" href="#">
                    <img src="../assets/logo.png" alt="" height="50px">
                </a>
                <button @click="isOpen ? isOpen = false : isOpen = true"
                        class="navbar-toggler p-0 border-0"
                        type="button" id="navbarSideCollapse"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="navbar-collapse offcanvas-collapse justify-content-md-center" :class="isOpen ? 'open' : ''" id="navbarsExampleDefault">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Bridge</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Launch App</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

    export default {
        name: 'Header',
        components: {
        },
        data() {
            return {
                isOpen: false
            }
        }
    }
</script>
