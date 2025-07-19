<script>
	// No script needed for static content
</script>

<svelte:head>
	<title>AgriGuide - About</title>
</svelte:head>

<div class="about-container">
	<h1><i class="fas fa-leaf"></i> About AgriGuide</h1>

	<div class="hero-section">
		<div class="hero-content">
			<h2>Empowering Smallholder Farmers in Laos</h2>
			<p class="hero-text">
				AgriGuide is an agricultural information system designed specifically for low-income farmers
				in Laos. We help farmers make informed decisions about crop selection, planting times, and
				market opportunities using real-time sensor data and weather forecasting.
			</p>
		</div>
		<div class="hero-icon">🇱🇦</div>
	</div>

	<div class="problem-section">
		<h3><i class="fas fa-crosshairs"></i> The Challenge We Address</h3>
		<div class="problem-grid">
			<div class="problem-card">
				<div class="problem-icon"><i class="fas fa-chart-line"></i></div>
				<h4>Market Volatility</h4>
				<p>
					Food price fluctuations have devastating impacts on smallholder farmers' profitability.
					Without access to market information, farmers often plant common crops only to face
					unexpected price drops at harvest time.
				</p>
			</div>
			<div class="problem-card">
				<div class="problem-icon"><i class="fas fa-clock"></i></div>
				<h4>Long Production Cycles</h4>
				<p>
					Farmers commit to crops months before harvest, making decisions based on limited
					information about future market conditions and optimal growing periods.
				</p>
			</div>
			<div class="problem-card">
				<div class="problem-icon"><i class="fas fa-shield-alt"></i></div>
				<h4>Limited Safety Nets</h4>
				<p>
					Most smallholder farmers lack savings or insurance to buffer against losses, making poor
					crop choices potentially catastrophic for their livelihoods.
				</p>
			</div>
		</div>
	</div>

	<div class="solution-section">
		<h3><i class="fas fa-lightbulb"></i> Our Solution</h3>
		<div class="solution-content">
			<div class="solution-text">
				<p>
					AgriGuide leverages the growing availability of internet-connected mobile phones in Laos
					to provide farmers with:
				</p>
				<ul class="solution-features">
					<li>
						<strong><i class="fas fa-chart-bar"></i> Smart Crop Recommendations:</strong>
						Based on real-time soil moisture, light, and temperature sensor data
					</li>
					<li>
						<strong><i class="fas fa-cloud-sun"></i> Weather Intelligence:</strong>
						7-day weather forecasts with crop-specific warnings and advice
					</li>
					<li>
						<strong><i class="fas fa-dollar-sign"></i> Market Insights:</strong>
						Current crop prices and optimal planting times for maximum profitability
					</li>
					<li>
						<strong><i class="fas fa-crosshairs"></i> Personalized Guidance:</strong>
						Tailored recommendations based on your specific growing conditions
					</li>
				</ul>
			</div>
			<div class="solution-visual">
				<div class="phone-mockup">
					<div class="phone-screen">
						<div class="app-preview">
							<div class="preview-header">🌱 AgriGuide</div>
							<div class="preview-content">
								<div class="preview-metric">🌡️ 28°C</div>
								<div class="preview-metric">💧 65%</div>
								<div class="preview-metric">☀️ 25k lux</div>
							</div>
							<div class="preview-recommendation">
								<span>✨ Rice - Best choice</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="impact-section">
		<h3><i class="fas fa-star"></i> Making a Difference</h3>
		<div class="impact-grid">
			<div class="impact-stat">
				<div class="stat-number"><i class="fas fa-crosshairs"></i></div>
				<div class="stat-label">Precision Agriculture</div>
				<p>Real-time sensor data ensures optimal crop selection for your specific conditions</p>
			</div>
			<div class="impact-stat">
				<div class="stat-number"><i class="fas fa-bolt"></i></div>
				<div class="stat-label">Instant Access</div>
				<p>Get recommendations anytime, anywhere with your mobile device</p>
			</div>
			<div class="impact-stat">
				<div class="stat-number"><i class="fas fa-handshake"></i></div>
				<div class="stat-label">Community Focused</div>
				<p>Built specifically for the needs of Laotian smallholder farmers</p>
			</div>
		</div>
	</div>

	<div class="mission-section">
		<div class="mission-content">
			<h3><i class="fas fa-rocket"></i> Our Mission</h3>
			<p>
				We believe that access to information can transform agricultural livelihoods. By combining
				modern sensor technology with traditional farming knowledge, AgriGuide empowers farmers to
				make data-driven decisions that increase profitability and reduce risk.
			</p>
			<div class="mission-values">
				<div class="value">
					<span class="value-icon"><i class="fas fa-seedling"></i></span>
					<span>Sustainable farming practices</span>
				</div>
				<div class="value">
					<span class="value-icon"><i class="fas fa-mobile-alt"></i></span>
					<span>Accessible technology</span>
				</div>
				<div class="value">
					<span class="value-icon"><i class="fas fa-graduation-cap"></i></span>
					<span>Farmer education</span>
				</div>
				<div class="value">
					<span class="value-icon"><i class="fas fa-heart"></i></span>
					<span>Community prosperity</span>
				</div>
			</div>
		</div>
	</div>

	<div class="cta-section">
		<h3><i class="fas fa-star"></i> Ready to Get Started?</h3>
		<p>Transform your farming decisions with AgriGuide's intelligent recommendations.</p>
		<a href="/" class="cta-button">Start Using AgriGuide</a>
	</div>
</div>

<style>
	.about-container {
		max-width: 100%;
		padding-bottom: 20px;
	}

	.hero-section {
		background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
		border-radius: 16px;
		padding: 32px 24px;
		margin-bottom: 32px;
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.hero-content {
		flex: 1;
	}

	.hero-content h2 {
		color: #2c3e50;
		margin-bottom: 16px;
		font-size: 24px;
	}

	.hero-text {
		font-size: 16px;
		line-height: 1.6;
		color: #555;
	}

	.hero-icon {
		font-size: 64px;
		flex-shrink: 0;
	}

	.problem-section,
	.solution-section,
	.impact-section,
	.mission-section {
		margin-bottom: 40px;
	}

	.problem-section h3,
	.solution-section h3,
	.impact-section h3,
	.mission-section h3 {
		font-size: 24px;
		color: #2c3e50;
		margin-bottom: 24px;
		text-align: center;
	}

	.problem-grid {
		display: grid;
		gap: 20px;
		margin-bottom: 32px;
	}

	.problem-card {
		background: white;
		border-radius: 12px;
		padding: 24px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.problem-icon {
		font-size: 48px;
		margin-bottom: 16px;
		color: #4caf50;
	}

	.problem-card h4 {
		color: #2c3e50;
		margin-bottom: 12px;
		font-size: 18px;
	}

	.problem-card p {
		color: #666;
		line-height: 1.5;
		font-size: 14px;
	}

	.solution-content {
		display: grid;
		gap: 32px;
		align-items: center;
	}

	.solution-text p {
		color: #555;
		line-height: 1.6;
		margin-bottom: 20px;
		font-size: 16px;
	}

	.solution-features {
		list-style: none;
		padding: 0;
	}

	.solution-features li {
		margin-bottom: 16px;
		padding: 16px;
		background: #f8f9fa;
		border-radius: 8px;
		border-left: 4px solid #4caf50;
	}

	.solution-features strong {
		color: #2c3e50;
	}

	.phone-mockup {
		background: #333;
		border-radius: 24px;
		padding: 8px;
		max-width: 200px;
		margin: 0 auto;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.phone-screen {
		background: white;
		border-radius: 16px;
		overflow: hidden;
	}

	.app-preview {
		padding: 20px;
		text-align: center;
	}

	.preview-header {
		font-weight: bold;
		color: #4caf50;
		margin-bottom: 16px;
		font-size: 14px;
	}

	.preview-content {
		display: flex;
		justify-content: space-around;
		margin-bottom: 16px;
	}

	.preview-metric {
		font-size: 12px;
		color: #666;
	}

	.preview-recommendation {
		background: #e8f5e8;
		padding: 8px;
		border-radius: 8px;
		font-size: 12px;
		color: #2c3e50;
		font-weight: 500;
	}

	.impact-grid {
		display: grid;
		gap: 24px;
		text-align: center;
	}

	.impact-stat {
		background: white;
		border-radius: 12px;
		padding: 32px 24px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	}

	.stat-number {
		font-size: 48px;
		margin-bottom: 12px;
		color: #4caf50;
	}

	.stat-label {
		font-size: 18px;
		font-weight: 600;
		color: #2c3e50;
		margin-bottom: 8px;
	}

	.impact-stat p {
		color: #666;
		font-size: 14px;
		line-height: 1.4;
	}

	.mission-section {
		background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
		border-radius: 16px;
		padding: 32px 24px;
	}

	.mission-content h3 {
		text-align: left;
		margin-bottom: 16px;
	}

	.mission-content p {
		color: #555;
		line-height: 1.6;
		margin-bottom: 24px;
		font-size: 16px;
	}

	.mission-values {
		display: grid;
		gap: 12px;
	}

	.value {
		display: flex;
		align-items: center;
		gap: 12px;
		color: #2c3e50;
		font-weight: 500;
	}

	.value-icon {
		font-size: 24px;
		color: #4caf50;
	}

	.cta-section {
		text-align: center;
		background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
		color: white;
		border-radius: 16px;
		padding: 40px 24px;
	}

	.cta-section h3 {
		color: white;
		margin-bottom: 12px;
	}

	.cta-section p {
		margin-bottom: 24px;
		opacity: 0.9;
		font-size: 16px;
	}

	.cta-button {
		display: inline-block;
		background: white;
		color: #4caf50;
		padding: 16px 32px;
		border-radius: 50px;
		text-decoration: none;
		font-weight: 600;
		font-size: 16px;
		transition: all 0.3s ease;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
	}

	/* Desktop responsive adjustments */
	@media (min-width: 768px) {
		.hero-section {
			padding: 48px 40px;
		}

		.hero-content h2 {
			font-size: 32px;
		}

		.hero-text {
			font-size: 18px;
		}

		.hero-icon {
			font-size: 96px;
		}

		.problem-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.solution-content {
			grid-template-columns: 2fr 1fr;
		}

		.impact-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.mission-values {
			grid-template-columns: repeat(2, 1fr);
		}

		.cta-section {
			padding: 60px 40px;
		}
	}

	@media (min-width: 1024px) {
		.mission-values {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
