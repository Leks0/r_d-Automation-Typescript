// Мені фронти дещо підсказали ідею, перевіряти наявність елементів кодом через консоль

## 1. Перевірити, що інпут пошуку присутній на сторінці
### CSS-selector
    
    ```json
    console.log(document.querySelector('input#gh-ac') !== null);
    ```
### XSS-selector
    ```json
    console.log($x("//input[@id='gh-ac']").length > 0);
    ```
    
## 2. Перевірити, що кнопка “Очистити пошук” не відображається
### CSS-selector
    ```json
    console.log(document.querySelector('button.gh-search-input__clear-btn') !== null && window.getComputedStyle(document.querySelector('button.gh-search-input__clear-btn')).visibility === 'hidden');
    ```
### XSS-selector
    ```json
    console.log($x("//button[contains(@class, 'gh-search-input__clear-btn')]")[0] !== undefined && window.getComputedStyle($x("//button[contains(@class, 'gh-search-input__clear-btn')]")[0]).visibility === 'hidden');
    ```
    
## 3. Перевірити, кнопка Search присутня на сторінці
### CSS-selector
    ```json
    console.log(document.querySelector('button#gh-search-btn') !== null);
    ```
### XSS-selector
    ```json
    console.log($x("//button[@id='gh-search-btn']").length == 1);
    ```
    
## 4. Ввести “macbook pro” в інпуті пошуку і перевірити value значення інпуту
### CSS-selector
    ```json
    console.log(document.querySelector('input#gh-ac').value === 'macbook pro');
    ```
### XSS-selector
    ```json
    console.log($x("//input[@id='gh-ac']")[0].value === 'macbook pro');
    ```
    
## 5. Перевірити, що кнопка “Очистити пошук” відображається
### CSS-selector
    ```json
    console.log(document.querySelector('button.gh-search-input__clear-btn.is-active') !== null);
    ```
### XSS-selector
    ```json
    console.log($x("//button[contains(@class, 'gh-search-input__clear-btn') and contains(@class, 'is-active')]").length > 0);
    
    ```