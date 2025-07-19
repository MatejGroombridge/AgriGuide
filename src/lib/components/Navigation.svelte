<script>
	import { page } from '$app/stores';

	$: currentPath = $page.route.id;
</script>

<nav class="navbar">
	<a
		href="/about"
		class="nav-item"
		class:active={currentPath === '/about'}
		class:disabled={currentPath === '/about'}
	>
		<div class="nav-icon"><i class="fas fa-info-circle"></i></div>
		<span>About</span>
	</a>

	<a
		href="/"
		class="nav-item"
		class:active={currentPath === '/'}
		class:disabled={currentPath === '/'}
	>
		<div class="nav-icon"><i class="fas fa-home"></i></div>
		<span>Home</span>
	</a>

	<a
		href="/search"
		class="nav-item"
		class:active={currentPath === '/search'}
		class:disabled={currentPath === '/search'}
	>
		<div class="nav-icon"><i class="fas fa-search"></i></div>
		<span>Search</span>
	</a>
</nav>

<style>
	.navbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		border-top: 1px solid #e0e0e0;
		display: flex;
		padding: 12px 0;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	/* Desktop responsive adjustments */
	@media (min-width: 768px) {
		.navbar {
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			max-width: 1160px;
			margin: 0 20px;
			border-radius: 12px 12px 0 0;
		}
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		color: #666;
		transition: all 0.3s ease;
		padding: 8px;
		border-radius: 8px;
		min-width: 60px;
		flex: 1; /* Make each nav item take up equal space */
		justify-content: center; /* Center content vertically */
		font-family: 'Lato', sans-serif;
	}

	.nav-item:hover:not(.disabled) {
		background: #f5f5f5;
		color: #333;
	}

	.nav-item.active {
		color: #4caf50;
		font-weight: 600;
		font-family: 'Lato', sans-serif;
	}

	.nav-item.disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.nav-icon {
		font-size: 24px;
		margin-bottom: 4px;
	}

	.nav-item span {
		font-size: 12px;
		font-weight: 500;
		font-family: 'Lato', sans-serif;
	}
</style>
