FROM php:8.1-fpm

WORKDIR /var/www/backend

COPY ./composer.json /var/www/backend


RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip \
    && docker-php-ext-install mysqli pdo_mysql

COPY . .

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

RUN composer install --optimize-autoloader --no-dev

RUN php artisan key:generate

#RUN php artisan migrate --seed

CMD ["php-fpm"]